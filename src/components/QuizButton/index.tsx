import styles from "./styles.module.scss";
import { FiEdit } from "react-icons/fi";
interface Props {
  title: string;
  onClick: () => void;
}

export default function QuizButton({ onClick, title }: Props) {
  return (
    <button className={styles.container} onClick={onClick}>
      <h2>{title}</h2>
      <FiEdit className={styles.icon} />
    </button>
  );
}
