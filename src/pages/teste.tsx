import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/login.module.scss";
import homeForm from "../../public/images/homeForm.svg";
import Button from "../components/Button";
import Input from "../components/Input";

const Login: NextPage = () => {
  const handleLogin = () => {
    console.log("entrou");
  };

  return (
    <div >
     <h1>Alo</h1>
    </div>
  );
};

export default Login;
