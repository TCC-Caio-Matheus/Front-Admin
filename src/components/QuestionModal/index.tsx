import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import QuestionType from "../QuestionType";
import styles from "./styles.module.scss";
import YesNoAnswer from "../YesNoAnwser";
import MultiAnwser from "../MultiAnwser";
import { Question, Recommendation } from "../../intefaces";
import MultiRecommendations from "../MultiRecommendations";

interface Props {
  closeModal: (close: boolean) => void;
  createQuestion: (question: Question) => void;
}

interface AnwserModal {
  yes: number;
  no: number;
  yesNo: number;
}

export default function QuestionModal({ closeModal, createQuestion }: Props) {
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [recommendations, setRecommendation] = useState<
    Array<Recommendation> | undefined
  >(undefined);
  const [page, setPage] = useState<number>(0);

  const handleResponse = (answer: AnwserModal) => {
    console.log(answer);
  };

  const nextPage = () => {
    setPage(1);
  };

  const handleSelect = (type: string) => {
    setQuestion({ ...question, type } as Question);
  };

  const handleRecommendantions = (recommendations: Array<Recommendation>) => {
    setRecommendation(recommendations);
  };

  const handleCreateQuestion = () => {
    let temp = question;
    if (temp != undefined) {
      temp.recommendations = recommendations;
      setQuestion(temp);
    }
    if (question != undefined) {
      createQuestion(question);
      closeModal(false)
    }
  };

  const awnserBasedOnType = () => {
    switch (question?.type) {
      case "multi":
        return (
          <>
            <MultiAnwser
              getValues={(values) =>
                setQuestion({ ...question, awnsers: values })
              }
            />
          </>
        );
        break;
      case "yes":
        return (
          <>
            <h2>Nota das respostas</h2>
            <YesNoAnswer handleResponse={handleResponse} />
          </>
        );
        break;
      case "slider":
        return;
        break;
      default:
        return <h2>Selecione o tipo de pergunta</h2>;
    }
  };

  return (
    <div className={styles.container}>
      {page == 0 ? (
        <div className={styles.content}>
          <div className={styles.insideContent}>
            <Input
              text="Titulo da pergunta"
              onChange={(value) =>
                setQuestion({ ...question, title: value } as Question)
              }
            />
            <Input
              text="Nota pergunta"
              type="number"
              onChange={(value) =>
                setQuestion({ ...question, score: parseInt(value) } as Question)
              }
            />
            <QuestionType onChange={handleSelect} />
            {awnserBasedOnType()}

            <div className={styles.buttonView}>
              <Button text="Criar Recomendações" onClick={nextPage} />
              <Button
                text="Cancelar"
                outline={true}
                onClick={() => closeModal(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.insideContent}>
            <MultiRecommendations
              getValues={(values) => handleRecommendantions(values)}
            />

            <div className={styles.buttonView}>
              <Button text="Criar pergunta" onClick={handleCreateQuestion} />
              <Button
                text="Cancelar"
                outline={true}
                onClick={() => closeModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
