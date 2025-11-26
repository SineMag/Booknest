import type { Dispatch, SetStateAction } from "react";
import type { IconType } from "react-icons";
import styles from "./inputfield.module.css";

interface Props {
  for?: string;
  type: string;
  placeholder?: string; // Made placeholder optional as label might be sufficient
  field: string;
  setField: Dispatch<SetStateAction<string>>;
  icon?: IconType;
  disabled?: boolean;
  label?: string; // New prop for the label
  details?: string; // New prop for additional details/helper text
}

export default function InputField(props: Props) {
  return (
    <div className={styles.inputGroup}>
      {props.label && <label className={styles.label} htmlFor={props.for}>{props.label}</label>}
      <div className={styles.inputContainer}> {/* Added container for input and icon */}
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
          id={props.for} // Connect label to input
        />
      </div>
      {props.details && <p className={styles.details}>{props.details}</p>}
    </div>
  );
}
