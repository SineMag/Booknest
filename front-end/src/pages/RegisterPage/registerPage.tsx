import styles from "./registerPage.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerForm}>
        <h1>Create Account</h1>
        <form>
          <div className={styles.inputBox}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className={styles.inputBox}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className={styles.inputBox}>
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>

          <div className={styles.inputBox}>
            <label>Physical Address</label>
            <input type="text" placeholder="Enter your address" />
          </div>

          <div className={styles.inputBox}>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className={styles.inputBox}>
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter password" />
          </div>

          
        </form>
      </div>
    </div>
  );
}
