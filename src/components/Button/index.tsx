import styles from "./styles.module.scss";
interface Props {
    outline:boolean,
    text:string,
    onClick: () => void,
}


export default function Button({onClick, text,outline}:Props) {

  return (
    <button className={outline ? styles.outlineButton : styles.defaultButton} onClick={onClick} >
      <p>{text}</p>
    </button>
  );
}
