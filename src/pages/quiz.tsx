import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../components/Button";
import Header from "../components/Header";
import styles from "../styles/quiz.module.scss";
import empty from "../../public/images/empty.svg";
import Modal from "react-modal";
import QuestionModal from "../components/QuestionModal";

const Quiz: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header title="Criar questionário" />
      <QuestionModal />
      <div className={styles.container}>
        <div className={styles.titleHeader}>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Formulário sem titulo"
          ></input>

          <FiEdit className={styles.editIcon} />
        </div>
        <hr />
        <div className={styles.buttonView}>
          <Button text="Nova pergunta" onClick={openModal} />
        </div>

        {questions ? (
          <div></div>
        ) : (
          <div className={styles.noData}>
            <span>Formuario sem perguntas</span>
            <Image src={empty} />
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
