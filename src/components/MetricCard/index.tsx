import styles from "./styles.module.scss";
import { IoPeople } from "react-icons/io5";

interface Props {
  title: string;
  value: string;
}

export default function MetricCard({ title, value }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleHeader}>
          <IoPeople className={styles.titleIcon} />
          <p>{title}</p>
        </div>
        <div className={styles.valueView}>
          <h1>{value}</h1>
        </div>
      </div>
    </div>
  );
}
