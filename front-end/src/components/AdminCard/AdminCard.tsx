import React from 'react';
import styles from './AdminCard.module.css';
import Button from '../Button/Button';

interface AdminCardProps {
  name: string;
  description: string;
  onView: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ name, description, onView }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <Button onClick={onView} variant="primary">
          View
        </Button>
      </div>
    </div>
  );
};

export default AdminCard;
