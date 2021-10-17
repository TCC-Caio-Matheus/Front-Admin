import React from 'react';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import GlobalStyle from '../styles/global';
import { useApollo } from '../services/graphql';

import theme from '../styles/theme';
// import AppProvider from '../hooks';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const client = useApollo(pageProps.initializeApolloState, pageProps.session);

  return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          {/* <AppProvider> */}
            <Component {...pageProps} />
          {/* </AppProvider> */}
        </ApolloProvider>
        <GlobalStyle />

        <NextNprogress
          color="#52b232"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
        />
      </ThemeProvider>
  );
};

export default MyApp;
