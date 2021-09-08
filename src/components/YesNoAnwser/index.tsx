import styles from "./styles.module.scss";
import { useState } from "react";
import { MdThumbUp, MdThumbDown, MdThumbsUpDown } from "react-icons/md";

interface Props {
  handleResponse: (anwser: AnwserModal) => void;
}

interface AnwserModal {
  yes: number;
  no: number;
  yesNo: number;
}

export default function YesNoAnswer({ handleResponse }: Props) {
  const [anwser, setAnwser] = useState<AnwserModal>({
    yes: 0,
    no: 0,
    yesNo: 0,
  });

  const handleTeste = () => {
    console.log(anwser);
    handleResponse(anwser);
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
            console.log("entrou aqui", e.target.value);
            setAnwser({
              ...anwser,
              no: parseInt(e.target.value),
            });
            handleTeste();
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
            setAnwser({
              ...anwser,
              yesNo: parseInt(e.target.value),
            });
            handleTeste();
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
            setAnwser({
              ...anwser,
              yes: parseInt(e.target.value),
            });
            handleTeste();
          }}
          placeholder="Nota"
          type="number"
        ></input>
      </div>
    </div>
  );
}
