import styles from "./styles.module.css";

type InputProps = {
  value: string | number;
  helperText: string;
  onChange: (value: string) => void;
};

function Input({ value, helperText, onChange }: InputProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.helperText}>{helperText}</div>
    </div>
  );
}

export { Input as default };
