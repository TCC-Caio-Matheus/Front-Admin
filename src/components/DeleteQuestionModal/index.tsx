import Button from "../Button";
import styles from "./styles.module.scss";

interface Props {
  getResponse: (response: boolean,id:string) => void;
  id:string
}

export default function DeleteQuestionModal({ getResponse,id }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Deseja deletar pergunta ?</h1>
        
        <div className={styles.buttonView}>
          <Button
            text="Cancelar"
            outline={true}
            onClick={() => {
              getResponse(false,id);
            }}
          />
          <Button
            text="Deletar"
            onClick={() => {
              getResponse(true,id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
