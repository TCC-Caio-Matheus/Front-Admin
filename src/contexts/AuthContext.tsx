import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { LOGIN } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";
import { UserCredentials, AuthContextType } from "../intefaces";
import Router from "next/router";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const client = useApolloClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { jwt: token } = parseCookies();

    if (token) {
      setIsAuthenticated(true);
      Router.push("/home");
    }
  }, []);

  async function checkToken() {
    const { jwt: token } = parseCookies();
    if (!token) {
      setIsAuthenticated(false);
    }else{
      setIsAuthenticated(true);
    }

    return isAuthenticated;
  }

  async function signIn({ email, password }: UserCredentials) {
    const response = await client.mutate({
      mutation: LOGIN,
      variables: {
        email,
        password,
      },
    });

    setCookie(undefined, "jwt", response.data.login.jwt, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setIsAuthenticated(true);
    Router.push("/home");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
}
