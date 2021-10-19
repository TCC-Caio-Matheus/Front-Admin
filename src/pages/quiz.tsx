/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../components/Button";
import Header from "../components/Header";
import styles from "../styles/quiz.module.scss";
import empty from "../../public/images/empty.svg";
import QuestionModal from "../components/QuestionModal";
import { Question } from "../intefaces";
import QuestionCard from "../components/QuestionCard";

const Quiz: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Array<Question> | undefined>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  const createQuestion = (question: Question) => {
    if (questions != undefined) {
      setQuestions([...questions, question]);
    }
  };

  return (
    <>
      <Header title="Criar questionário" />
      {isModalOpen ? (
        <QuestionModal
          createQuestion={(question: Question) => createQuestion(question)}
          closeModal={(value) => handleModal(value)}
        />
      ) : (
        ""
      )}
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
          <Button
            text="Nova pergunta"
            onClick={() => {
              handleModal(true);
            }}
          />
        </div>

        {questions?.length != 0 ? (
          <div className={styles.cardsView}>
            {questions?.map((question, index) => {
              return (
                <QuestionCard key={question.title} title={question.title} />
              );
            })}
          </div>
        ) : (
          <div className={styles.noData}>
            <span>Formuario sem perguntas</span>
            <img alt="Empty box" src={empty} />
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
