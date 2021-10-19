import React from "react";
import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import GlobalStyle from "../styles/global";
import { useApollo } from "../services/graphql";
import "../styles/global.scss";
import theme from "../styles/theme";
import { AuthProvider } from "../contexts/AuthContext";
// import AppProvider from '../hooks';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const client = useApollo(pageProps.initializeApolloState, pageProps.session);

  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          {/* <AppProvider> */}
          <Component {...pageProps} />
          {/* </AppProvider> */}
        </AuthProvider>
      </ApolloProvider>

      <NextNprogress
        color="#1B1F22"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
    </>
  );
};

export default MyApp;
