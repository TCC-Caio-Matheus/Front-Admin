import styles from "./styles.module.scss";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  title: string;
  deleteQuestion: () => void;
}

export default function QuestionCard({ title, deleteQuestion }: Props) {
  return (
    <button className={styles.card}>
      <span>{title}</span>
      <div className={styles.iconsView}>
        <AiFillDelete onClick={deleteQuestion} className={styles.deleteIcon} />
      </div>
    </button>
  );
}
