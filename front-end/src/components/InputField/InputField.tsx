import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";
import styles from "./inputfield.module.css";

interface Props {
  for?: string;
  type: string;
  placeholder: string;
  field: string;
  setField: Dispatch<SetStateAction<string>>;
  icon?: IconType;
  disabled?: boolean;
}

export default function InputField(props: Props) {
  return (
    <div className={styles.inputGroup}>
      {props.icon ? (
        <div className={styles.inputIcon}>
          <props.icon />
        </div>
      ) : null}
      <input
        type={props.type}
        className={styles.input}
        placeholder={props.placeholder}
        value={props.field}
        onChange={(e) => props.setField(e.target.value)}
        required
        disabled={props.disabled}
      />
    </div>
  );
}
