import styles from "./styles.module.scss";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  title: string;
}

export default function QuestionCard({ title }: Props) {
  return (
    <div className={styles.card}>
      <span>{title}</span>
      <div className={styles.iconsView}>

      <AiFillDelete  className={styles.deleteIcon}/>
      </div>
    </div>
  );
}
