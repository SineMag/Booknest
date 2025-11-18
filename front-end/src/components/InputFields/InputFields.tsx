import React, { useState } from "react";
import styles from "./InputFields.module.css";

type ProfileData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export default function UserProfileForm(): React.ReactElement {
  const [data, setData] = useState<ProfileData>({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-card"]}>
        <h2 className={styles["profile-title"]}>Profile</h2>

        <div className={styles["form-fields"]}>
          <div className={styles["form-row"]}>
            <label className={styles["form-label"]}>
              <span className={styles["label-text"]}>Name</span>
              <input
                className={styles["form-input"]}
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                aria-label="Name"
              />
            </label>

            <label className={styles["form-label"]}>
              <span className={styles["label-text"]}>Surname</span>
              <input
                className={styles["form-input"]}
                name="surname"
                value={data.surname}
                onChange={handleChange}
                placeholder="Enter your surname"
                aria-label="Surname"
              />
            </label>
          </div>

          <label className={styles["form-label"]}>
            <span className={styles["label-text"]}>Email</span>
            <input
              className={styles["form-input"]}
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="cbonelo224@gmail.com"
              aria-label="Email"
            />
          </label>

          <label className={styles["form-label"]}>
            <span className={styles["label-text"]}>Password</span>
            <div className={styles["password-wrapper"]}>
              <input
                className={`${styles["form-input"]} ${styles["password-input"]}`}
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange}
                placeholder="Enter a secure password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={styles["password-toggle"]}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <label className={styles["form-label"]}>
            <span className={styles["label-text"]}>Phone number</span>
            <input
              className={styles["form-input"]}
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="+27 71 000 0000"
              aria-label="Phone number"
            />
          </label>

          <label className={styles["form-label"]}>
            <span className={styles["label-text"]}>Physical address</span>
            <textarea
              className={styles["form-textarea"]}
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Street, City, Postal Code, Country"
              rows={3}
              aria-label="Physical address"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
