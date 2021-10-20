import styles from "./styles.module.scss";

import { IconType } from "react-icons";

interface Props {
  title: string;
  value: string;
  icon:  React.ReactNode;
}

export default function MetricCard({ title, value, icon }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleHeader}>
          {icon}
          <p>{title}</p>
        </div>
        <div className={styles.valueView}>
          <h1>{value}</h1>
        </div>
      </div>
    </div>
  );
}
