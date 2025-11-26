// Modal.tsx
import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h3>{title}</h3>}
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>
            {cancelText}
          </button>
          {onConfirm && (
            <button className={styles.confirm} onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
