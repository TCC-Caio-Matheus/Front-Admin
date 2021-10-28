import styles from "./styles.module.scss";
import { useState } from "react";
import { MdThumbUp, MdThumbDown, MdThumbsUpDown } from "react-icons/md";
import { QuestionOption } from "../../intefaces";

interface Props {
  getValues: (anwser: QuestionOption[]) => void;
  
}

export default function YesNoAnswer({ getValues }: Props) {
  const [anwser, setAnwser] = useState<QuestionOption[]>([
    {
      description: "NO",
      score: 0,
    },
    {
      description: "DONT_KNOW",
      score: 0,
    },
    {
      description: "YES",
      score: 0,
    },
  ]);

  const handleAwnser = () => {
    getValues(anwser);
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.button}>
          <MdThumbDown className={styles.noIcon} />
          <span>Não</span>
        </div>
        <input
          onChange={(e) => {
            let temp = anwser;
            temp[0].score = parseInt(e.target.value);
            setAnwser(temp);
            handleAwnser();
          }}
          placeholder="Nota"
          type="number"
        ></input>
      </div>
      <div>
        <div className={styles.button}>
          <MdThumbsUpDown className={styles.yesNoIcon} />
          <span>Não sei</span>
        </div>
        <input
          onChange={(e) => {
            let temp = anwser;
            temp[1].score = parseInt(e.target.value);
            setAnwser(temp);
            handleAwnser();
          }}
          placeholder="Nota"
          type="number"
        ></input>
      </div>
      <div>
        <div className={styles.button}>
          <MdThumbUp className={styles.yesIcon} />
          <span>Sim</span>
        </div>
        <input
          onChange={(e) => {
            let temp = anwser;
            temp[2].score = parseInt(e.target.value);
            setAnwser(temp);
            handleAwnser();
          }}
          placeholder="Nota"
          type="number"
        ></input>
      </div>
    </div>
  );
}
