import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { LOGIN } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import { UserCredentials, AuthContextType } from "../intefaces";
import Router from 'next/router'

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const isAuthenticated = true;
  const client = useApolloClient();

  useEffect(() => {
    const { "admin.token": token } = parseCookies();

    if (token) {
        // Router.push('/home')
    }
  }, []);

  async function signIn({ email, password }: UserCredentials) {
    const response = await client.mutate({
      mutation: LOGIN,
      variables: {
        email,
        password,
      },
    });

    setCookie(undefined, "admin.token", response.data.login.jwt, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    Router.push('/home')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
