import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/home.module.scss";
import homeForm from "../../public/images/homeForm.svg";
import Button from "../components/Button";
import Input from "../components/Input";

const Home: NextPage = () => {
  const handleLogin = () => {
    console.log("entrou");
  };

  return (
    <div className={styles.container}>
      <section className={styles.contentContainer}>
        <h1>E-diagnostios</h1>
        <div className={styles.fields}>
          <Input text="Email" />
          <Input text="Senha" type="password" />
        </div>
        <div className={styles.buttons}>
          <p>Esqueceu a senha ?</p>
          <Button outline={false} text="ENTRAR" onClick={handleLogin} />
        </div>
      </section>
      <section className={styles.imageContainer}>
        <Image src={homeForm} alt="form" />
      </section>
    </div>
  );
};

export default Home;
