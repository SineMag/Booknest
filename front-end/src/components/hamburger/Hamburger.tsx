import React from 'react';
import styles from './Hamburger.module.css';

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, onClick }) => {
  return (
    <button className={styles.hamburgerButton} onClick={onClick} aria-label="Toggle navigation">
      <div className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`}></div>
      <div className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`}></div>
      <div className={`${styles.hamburgerLine} ${isOpen ? styles.open : ''}`}></div>
    </button>
  );
};

export default Hamburger;
