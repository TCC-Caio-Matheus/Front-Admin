import styles from "./styles.module.scss";
import { FiPlus } from "react-icons/fi";
interface Props {
  onClick: () => void;
}

export default function RoundButton({ onClick }: Props) {
  return (
    <button className={styles.roundButton} onClick={onClick}>
      <FiPlus className={styles.icon} />
    </button>
  );
}
