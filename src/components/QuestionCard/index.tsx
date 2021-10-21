import styles from "./styles.module.scss";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  title: string;
  onClick: () => void;
}

export default function QuestionCard({ title, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.card}>
      <span>{title}</span>
      <div className={styles.iconsView}>
        <AiFillDelete className={styles.deleteIcon} />
      </div>
    </button>
  );
}
