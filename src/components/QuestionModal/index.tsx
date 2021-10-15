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
}

interface AnwserModal {
  yes: number;
  no: number;
  yesNo: number;
}

export default function QuestionModal({ closeModal }: Props) {
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [recommendations, setRecommendation] = useState<
    Recommendation | undefined
  >(undefined);
  const [page, setPage] = useState<number>(0);

  const handleResponse = (answer: AnwserModal) => {
    console.log(answer);
  };

  const createQuestion = () => {
    setPage(1);
  };

  const handleSelect = (type: string) => {
    setQuestion({ ...question, type } as Question);
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
                setQuestion({ ...question, grade: parseInt(value) } as Question)
              }
            />
            <QuestionType onChange={handleSelect} />
            {awnserBasedOnType()}

            <div className={styles.buttonView}>
              <Button text="Criar Recomendações" onClick={createQuestion} />
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
            <MultiRecommendations getValues={(values) => console.log(values)} />

            <div className={styles.buttonView}>
              <Button text="Criar pergunta" onClick={createQuestion} />
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
