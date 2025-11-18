import React, { useState } from "react";
import styles from "../LoginForm/LoginForm.module.css";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        } as LoginFormData)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simple validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    // send to backend here (fetch/axios)
    console.log("Login Data:", formData);
    alert("Login submitted!");
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className={styles["error-msg"]}>{error}</p>}

        <div className={styles["input-group"]}>
          <label>Email or Username</label>
          <input
            type="text"
            name="email"
            placeholder="Enter email or username"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles["input-group"]}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles["options"]}>
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>

          <a href="/reset-password" className={styles["forgot"]}>
            Forgot Password?
          </a>
        </div>

        <button type="submit" className={styles["login-btn"]}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
