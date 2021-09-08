import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import QuestionType from "../QuestionType";
import styles from "./styles.module.scss";
import YesNoAnswer from "../YesNoAnwser";
import MultiAnwser from "../MultiAnwser";

interface AnwserModal {
  yes: number;
  no: number;
  yesNo: number;
}

export default function QuestionModal() {
  const [quizType, setQuizType] = useState("");

  const handleResponse = (answer: AnwserModal) => {
    console.log(answer);
  };

  const handleInput = () => {
    console.log("input");
  };

  const handleSelect = (type: string) => {
    setQuizType(type);
  };

  const awnserBasedOnType = () => {
    switch (quizType) {
      case "multi":
        return (
          <>
            <MultiAnwser />
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
        return <h1>Teste</h1>;
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.insideContent}>
          <Input text="Titulo da pergunta" onChange={handleInput} />
          <Input text="Nota pergunta" type="number" onChange={handleInput} />
          <QuestionType onChange={handleSelect} />
          {awnserBasedOnType()}

          <div className={styles.buttonView}>
            <Button text="Criar pergunta" onClick={handleInput} />
            <Button text="Cancelar" outline={true} onClick={handleInput} />
          </div>
        </div>
      </div>
    </div>
  );
}
