import { useState } from "react";
import Input from "../Input";
import RoundButton from "../RoundButton";
import styles from "./styles.module.scss";
import { QuestionOption } from "../../intefaces/index";

interface Props {
  getValues: (values: QuestionOption[]) => void;
}

export default function MultiAnwser({ getValues }: Props) {
  const [questionOptions, setQuestionOptions] = useState<QuestionOption[]>([
    { description: "", score: 0 },
  ]);
  const handleInput = (value: string, index: number, field: string) => {
    let temp = questionOptions;
    if (field == "anwser") {
      temp[index].description = value;
    } else {
      temp[index].score = parseInt(value);
    }
    setQuestionOptions(temp);
  };
  const addQuestion = () => {
    if (questionOptions.length == 4) {
      alert("Máximo de 4 perguntas");
    } else {
      setQuestionOptions([...questionOptions, { description: "", score: 0 }]);
    }
  };

  return (
    <div className={styles.container}>
      {questionOptions.map((questionOption, index) => {
        return (
          <div className={styles.anwsersView} key={index}>
            <Input
              text={"Resposta " + (index + 1).toString()}
              type="text"
              onChange={(value: string) => handleInput(value, index, "anwser")}
            />
            <input
              placeholder="Nota"
              type="number"
              className={styles.scoreInput}
              onChange={(e) => {
                handleInput(e.target.value, index, "score");
                getValues(questionOptions);
              }}
            />
          </div>
        );
      })}
      <RoundButton onClick={addQuestion} />
    </div>
  );
}
