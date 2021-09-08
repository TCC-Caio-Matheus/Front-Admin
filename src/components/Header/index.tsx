import { FiArrowLeft } from "react-icons/fi";
import styles from "./styles.module.scss";
interface Props {
  title: string;
  backButton?: boolean;
  onClick?: () => void;
}

export default function Header({ title, backButton, onClick }: Props) {
  return (
    <header className={styles.headerView}>
      {backButton ? (
        <FiArrowLeft onClick={onClick} className={styles.icon} />
      ) : (
        ""
      )}
      <p className={styles.title}>{title}</p>
    </header>
  );
}
