/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/login.module.scss";

import Button from "../components/Button";
import Input from "../components/Input";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login: NextPage = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const respose = await signIn({ email, password });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.contentContainer}>
      
        <div className={styles.fields}>
          {error ? (
            <div className={styles.errorView}>
              <p> Falha no login, por favor tente novamente </p>
            </div>
          ) : (
            <> </>
          )}
          <Input
            onChange={(value) => {
              setEmail(value);
            }}
            text="Email"
          />
          <Input
            onChange={(value) => {
              setPassword(value);
            }}
            text="Senha"
            type="password"
          />
        </div>
        <div className={styles.buttons}>
          
          <Button outline={false} text="ENTRAR" onClick={handleLogin} />
        </div>
      </section>
      <section className={styles.imageContainer}>
        <img src="images/homeForm.svg" alt="form" />
      </section>
    </div>
  );
};

export default Login;
