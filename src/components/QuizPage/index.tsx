/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../Button";
import Header from "../Header";
import styles from "./styles.module.scss";
//import empty from "../../public/images/empty.svg";
import QuestionModal from "../QuestionModal";
import { Question, Quiz } from "../../intefaces";
import QuestionCard from "../QuestionCard";
import router, { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { GET_QUIZ } from "../../graphql/queries";
import { UPDATE_QUIZ } from "../../graphql/mutations";

interface Props {
  isEditing?: boolean;
  id?: string;
}

const QuizPage = ({ isEditing, id }: Props) => {
  const client = useApolloClient();
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Array<Question> | null>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      (async function () {
        try {
          const response = await client.query({
            query: GET_QUIZ,
            variables: {
              id,
            },
          });
          console.log(response.data.quiz);
          setQuiz(response.data.quiz);
          setTitle(response.data.quiz.name);
          if (questions != null) {
            setQuestions(response.data.quiz.questions);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const handleModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  const handleSave = () => {
    if (isEditing) {
      editQuiz();
    }
  };

  const editQuiz = async () => {
    const updateQuizInput = {
      data: {
        name: quiz?.name,
      },
      where: {
        id: quiz?.id,
      },
    };
    try {
      const response = await client.mutate({
        mutation: UPDATE_QUIZ,
        variables: {
          quiz: updateQuizInput,
        },
      });
      router.push('/home')
    } catch (error) {
      alert(error);
    }
  };

  const createQuestion = (question: Question) => {
    if (questions != undefined) {
      setQuestions([...questions, question]);
    }
  };

  return (
    <>
      <Header
        title={!isEditing ? "Criar Questionário" : "Editar Questionário"}
      />
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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setQuiz({ ...quiz, name: e.target.value } as Quiz);
            }}
            placeholder="Formulário sem titulo"
          ></input>

          <FiEdit className={styles.editIcon} />
        </div>
        <hr />
        <div className={styles.buttonView}>
          <div>
            <Button
              outline={true}
              text="Nova pergunta"
              onClick={() => {
                handleModal(true);
              }}
            />
          </div>
          <div>
            <Button
              text="Salvar"
              onClick={() => {
                handleSave();
              }}
            />
          </div>
        </div>

        {questions?.length != 0 ? (
          <div className={styles.cardsView}>
            {questions?.map((question, index) => {
              return <QuestionCard key={index} title={question.title} />;
            })}
          </div>
        ) : (
          <div className={styles.noData}>
            <span>Formuario sem perguntas</span>
            <img alt="Empty box" src="images/empty.svg" />
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
