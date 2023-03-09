import styles from "@/styles/Input.module.css";

type Props = { 
  value: string,
  handler: any,
  action: any
};

const Input = (props: Props) => {
  const { value, handler, action } = props;

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Type an ETH address"
        type="text"
        value={value}
        onChange={handler}
      />
      <button className={styles.button} onClick={action}>Take a look!</button>
    </div>
  );
};

export default Input;
