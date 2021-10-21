import styles from "./styles.module.scss";

interface Props {
  onChange: (option: string) => void;
  value?:string,
}

export default function QuestionInput({ onChange,value }: Props) {
  const handleSelect = (option: string) => {
    console.log(option);
    onChange(option);
  };
  return (
    <div className={styles.container}>
      <span>Tipo de Pergunta ? </span>
      <select
        value={value}
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
        defaultValue='default'
      >
        <option value="default" disabled >
          Escolha tipo de pergunta
        </option>
        <option value="MULTIPLE_CHOICE">Multipla escolha</option>
        <option value="SINGLE_CHOICE">Sim ou Não</option>
        <option value="slider">Slider</option>
      </select>
    </div>
  );
}
