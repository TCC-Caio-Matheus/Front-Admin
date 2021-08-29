import styles from "./styles.module.scss";
interface Props {
  text: string;
  placeholder?: string;
  onChange?: () => void;
  type?: "text" | "password" | "number";
}

export default function Input({ text, placeholder, onChange, type }: Props) {
  return (
    <div className={styles.defaultInput}>
      <span>{text}</span>
      <input type={type} onChange={onChange} placeholder={placeholder}></input>
    </div>
  );
}
