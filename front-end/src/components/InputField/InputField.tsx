import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  placeholder?: string;
  type: string;
  field: string;
  setField: (value: string) => void;
  label?: string;
  details?: string;
  name?: string;
  /**
   * Optional controlled visibility: if provided, the parent controls
   * whether the password is shown. `onToggleShow` must be provided
   * when using `showPassword`.
   */
  showPassword?: boolean;
  onToggleShow?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export default function InputField({
  placeholder,
  type,
  field,
  setField,
  showPassword,
  onToggleShow,
  className,
  style,
  label,
  details,
  name,
}: Props) {
  const [localShow, setLocalShow] = useState(false);

  const isPassword = type === "password";

  const controlled =
    typeof showPassword === "boolean" && typeof onToggleShow === "function";
  const visible = controlled ? showPassword! : localShow;

  const handleToggle = () => {
    if (controlled) onToggleShow!();
    else setLocalShow((s) => !s);
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        marginBottom: "1rem",
        ...(style || {}),
      }}
    >
      {label && <label htmlFor={name} style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>{label}</label>}
      <input
        placeholder={placeholder}
        type={isPassword ? (visible ? "text" : "password") : type}
        value={field}
        onChange={(e) => setField(e.target.value)}
        name={name}
        id={name}
        style={{
          width: "100%",
          padding: isPassword ? "14px 45px 14px 14px" : "14px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          fontSize: "1rem",
        }}
      />
      {details && <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "5px" }}>{details}</p>}

      {/* SHOW / HIDE ICON */}
      {isPassword && (
        <button
          type="button"
          onClick={handleToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "20px",
            color: "#475569",
            background: "transparent",
            border: "none",
            padding: 0,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
    </div>
  );
}
