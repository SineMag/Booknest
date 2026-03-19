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
  min?: string;
  readOnly?: boolean;
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
  min,
  readOnly,
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
    <div className={`mb-3 position-relative ${className || ""}`} style={style}>
      {label && (
        <label htmlFor={name} className="form-label fw-bold text-dark">
          {label}
        </label>
      )}

      <div className="position-relative">
        <input
          placeholder={placeholder}
          type={isPassword ? (visible ? "text" : "password") : type}
          value={field}
          onChange={(e) => setField(e.target.value)}
          name={name}
          id={name}
          min={min}
          readOnly={readOnly}
          className={`form-control ${isPassword ? "pe-5" : ""}`}
          style={{
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "8px",
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={handleToggle}
            aria-label={visible ? "Hide password" : "Show password"}
            className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent text-secondary me-2"
            style={{ zIndex: 10, display: "inline-flex", alignItems: "center" }}
          >
            {visible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>

      {details && <div className="form-text mt-1 text-muted">{details}</div>}
    </div>
  );
}
