import styles from "./Footer.module.css";

export default function Footer() {
  const handleBackToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Footer navigation">
          <a className={styles.link} href="/">
            Home
          </a>
          <a className={styles.link} href="/privacy">
            Privacy Policy
          </a>
          <button
            className={styles.linkButton}
            type="button"
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            Back to top
          </button>
        </nav>

        <p className={styles.copy}>
          &copy; 2024 BookNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
