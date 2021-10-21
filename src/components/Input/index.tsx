import styles from "./styles.module.scss";
interface Props {
  text: string;
  placeholder?: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "number" | "multiline";
  value?: any;
}

export default function Input({
  text,
  placeholder,
  onChange,
  type,
  value,
}: Props) {
  return (
    <div className={styles.defaultInput}>
      <span>{text}</span>
      {type != "multiline" ? (
        <input
          value={value}
          type={type}
          onChange={(e) => {
            onChange(e?.target.value);
          }}
          placeholder={placeholder}
        ></input>
      ) : (
        <textarea
          onChange={(e) => {
            onChange(e?.target.value);
          }}
          placeholder={placeholder}
        ></textarea>
      )}
    </div>
  );
}
