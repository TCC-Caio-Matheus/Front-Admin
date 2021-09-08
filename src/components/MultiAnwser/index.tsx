import { useState } from "react";
import Input from "../Input";
import RoundButton from "../RoundButton";
import styles from "./styles.module.scss";

interface Props {
  getValues: (values: Anwser[]) => void;
}

interface Anwser {
  anwser: string;
  grade: number;
}

export default function MultiAnwser() {
  const [anwsers, setAnwsers] = useState<Anwser[]>([{ anwser: "", grade: 0 }]);
  const handleInput = (value: string, index: number, field: string) => {
    let temp = anwsers;
    if (field == "anwser") {
      temp[index].anwser = value;
    } else {
      temp[index].grade = parseInt(value);
    }
    setAnwsers(temp);
  };
  const addQuestion = () => {
    if (anwsers.length == 4) {
      alert("Máximo de 4 perguntas");
    } else {
      setAnwsers([...anwsers, { anwser: "", grade: 0 }]);
    }
  };
  return (
    <div className={styles.container}>
      {anwsers.map((anwser, index) => {
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
              className={styles.gradeInput}
              onChange={(e) => {
                handleInput(e.target.value, index, "grade");
              }}
            />
          </div>
        );
      })}
      <RoundButton onClick={addQuestion} />
    </div>
  );
}
