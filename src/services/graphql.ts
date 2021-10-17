import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

export function createApolloClient(session?: any | null) { // eslint-disable-line
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_BACKEND,
  });

  const authLink = setContext(async (_, { headers }) => {
    const authorization = session?.jwt ? `Bearer ${session?.jwt}` : '';
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

export function initializeApollo(initialState = {}, session?: Session | null) { // eslint-disable-line
  const apolloClientGlobal = createApolloClient(session);

  // if (initialState) {
  //   apolloClient.cache.restore(initialState);
  // }

  if (typeof window === 'undefined') return apolloClientGlobal;
  apolloClient = apolloClient ?? apolloClientGlobal;

  return apolloClientGlobal;
}

export function useApollo(initialState = {}, session?: Session | null) { // eslint-disable-line
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session],
  );

  return store;
}
