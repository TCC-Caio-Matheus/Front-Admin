import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { parseCookies } from 'nookies';
import { useMemo } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://strapi-bakckend-tcc.herokuapp.com/graphql";
let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function createApolloClient(session?: any | null) { // eslint-disable-line
  const httpLink = createHttpLink({
    uri: API_URL,
  });

  const authLink = setContext(async (_, { headers }) => {

    const { jwt: token } = parseCookies();

    const authorization = token ? `Bearer ${token}` : '';
    return {
      headers: {
        ...headers,
        authorization,
      },
    };
  });

  const httpAuthLink = authLink.concat(httpLink as any);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpAuthLink as any,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = {}, session:any) { // eslint-disable-line
  const apolloClientGlobal = createApolloClient(session);

  // if (initialState) {
  //   apolloClient.cache.restore(initialState);
  // }

  if (typeof window === 'undefined') return apolloClientGlobal;
  apolloClient = apolloClient ?? apolloClientGlobal;

  return apolloClientGlobal;
}

export function useApollo(initialState = {}, session:any) { // eslint-disable-line
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session],
  );

  return store;
}
