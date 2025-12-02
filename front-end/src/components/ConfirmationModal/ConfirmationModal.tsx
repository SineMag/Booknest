import React from 'react';
import Button from '../Button/Button';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  isDangerous?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonLabel = 'Confirm',
  cancelButtonLabel = 'Cancel',
  isDangerous = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={onCancel}
            variant="secondary"
          >
            {cancelButtonLabel}
          </Button>
          <Button
            onClick={onConfirm}
            variant={isDangerous ? 'danger' : 'primary'}
          >
            {confirmButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
