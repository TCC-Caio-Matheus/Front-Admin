/* eslint-disable @next/next/no-img-element */

import { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../Button";
import Header from "../Header";
import Loading from "../Loading";
import DeleteQuestionModal from "../DeleteQuestionModal";
import styles from "./styles.module.scss";
import empty from "../../../public/images/empty.svg";
import QuestionModal from "../QuestionModal";
import { Question, Quiz } from "../../intefaces";
import QuestionCard from "../QuestionCard";
import router, { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { GET_QUIZ } from "../../graphql/queries";
import {
  CREATE_QUIZ,
  DELETE_QUESTION,
  UPDATE_QUIZ,
} from "../../graphql/mutations";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
  isEditing?: boolean;
  id?: string;
}

const QuizPage = ({ isEditing, id }: Props) => {
  const client = useApolloClient();
  const authContext = useContext(AuthContext);
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Array<Question> | null>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<string | null>(null);
  const [handleDeleteModal, setHandleDeleteModal] = useState<boolean>(false);
  const [deleteQuestion, setDeleteQuestion] = useState<string>("");

  useEffect(() => {
    (async function () {
      const response = await authContext.checkToken();
      if (response) {
        if (isEditing) {
          try {
            const response = await client.query({
              query: GET_QUIZ,
              variables: {
                id,
              },
            });
  
            setQuiz(response.data.quiz);
            setTitle(response.data.quiz.name);
            if (questions != null) {
              setQuestions(response.data.quiz.questions);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }else{
        router.push('/')
      }
    
    })();
  }, []);

  const handleModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  const handleDeleteQuestion = async (respose: boolean, id: string) => {
    if (respose) {
      const deleteQuestionInput = deleteQuestionInputObj(id);
      console.log(deleteQuestionInput);
      try {
        const response = await client.mutate({
          mutation: DELETE_QUESTION,
          variables: {
            deleteQuestion: deleteQuestionInput,
          },
        });

        const temp = questions?.filter((question) => {
          if (question.id != id) {
            return true;
          }
        });
        if (temp) {
            setQuestions(temp);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("CANCELAR");
    }
    setHandleDeleteModal(false);
  };

  const openDeleteModal = (id?: string) => {
    if (id) {
      setDeleteQuestion(id);
      setHandleDeleteModal(true);
    }
  };

  const deleteQuestionInputObj = (id: string) => {
    return {
      where: {
        id: id,
      },
    };
  };

  const createQuizInputObj = () => {
    var ids: (string | undefined)[] = [];
    questions?.forEach((question) => {
      ids.push(question.id);
    });

    return {
      data: {
        name: quiz?.name,
        score: 100,
        questions: ids,
      },
    };
  };

  const updateQuizInputObj = () => {
    var ids: (string | undefined)[] = [];
    questions?.forEach((question) => {
      ids.push(question.id);
    });

    return {
      data: {
        name: quiz?.name,
        score: 100,
        questions: ids,
      },
      where: {
        id: quiz?.id,
      },
    };
  };

  const backPage = () => {
    router.back();
  };
  const handleSave = () => {
    if (isEditing) {
      editQuiz();
    } else {
      createQuiz();
    }
  };

  const editQuiz = async () => {
    const updateQuizInput = updateQuizInputObj();
    try {
      const response = await client.mutate({
        mutation: UPDATE_QUIZ,
        variables: {
          quiz: updateQuizInput,
        },
      });
      router.push("/home");
    } catch (error) {
      alert(error);
    }
  };

  const createQuiz = async () => {
    const createQuizInput = createQuizInputObj();
    try {
      const response = await client.mutate({
        mutation: CREATE_QUIZ,
        variables: {
          quiz: createQuizInput,
        },
      });
      router.push("/home");
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
        backButton={true}
        onClick={backPage}
        title={!isEditing ? "Criar Questionário" : "Editar Questionário"}
      />
      {handleDeleteModal ? (
        <DeleteQuestionModal
          id={deleteQuestion}
          getResponse={(value, id) => handleDeleteQuestion(value, id)}
        />
      ) : (
        ""
      )}
      {isModalOpen ? (
        <QuestionModal
          createQuestion={(question: Question) => createQuestion(question)}
          closeModal={(value) => handleModal(value)}
        />
      ) : (
        ""
      )}

      {editQuestion ? (
        <QuestionModal
          createQuestion={(question: Question) => createQuestion(question)}
          closeModal={(value) => handleModal(value)}
          editQuestion={editQuestion}
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
              return (
                <>
                  <QuestionCard
                    deleteQuestion={() => {
                      openDeleteModal(question?.id);
                    }}
                    key={question.id}
                    title={question.title}
                  />
                </>
              );
            })}
          </div>
        ) : (
          <div className={styles.noData}>
            <span>Formuario sem perguntas</span>
            <img alt="Empty box" src="/images/empty.svg" />
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
