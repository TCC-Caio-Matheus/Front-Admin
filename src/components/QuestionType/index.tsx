import styles from "./styles.module.scss";

interface Props {
  onChange: (option: string) => void;
}

export default function QuestionInput({ onChange }: Props) {
  const handleSelect = (option: string) => {
    console.log(option);
    onChange(option);
  };
  return (
    <div className={styles.container}>
      <span>Tipo de Pergunta ? </span>
      <select
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
      >
        <option value="" disabled selected>
          Escolha tipo de pergunta
        </option>
        <option value="multi">Multipla escolha</option>
        <option value="yes">Sim ou Não</option>
        <option value="slider">Slider</option>
      </select>
    </div>
  );
}
