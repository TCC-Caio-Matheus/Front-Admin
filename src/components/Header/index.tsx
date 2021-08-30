import styles from "./styles.module.scss";
interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <header className={styles.headerView}>
      <p className={styles.title}>{title}</p>
    </header>
  );
}
