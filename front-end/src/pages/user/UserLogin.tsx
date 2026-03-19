import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { loginUser } from "../../features/userSlice";
import { setLocalUser } from "../../utils/LocalStorage";
import styles from "./UserLogin.module.css";

const UserLogin: React.FC = () => {
  // states
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    current: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (user && user.id) {
      setLocalUser(user);
      localStorage.setItem(
        "rememberedUser",
        JSON.stringify({ emailAddress, password }),
      );

      setLocalUser(user);
      navigate("/dashboard");
    } else {
      setLocalUser({});
    }
  }, [user, emailAddress, password]);

  const handleLogin = () => {
    dispatch(
      loginUser({
        emailAddress,
        password,
      }),
    );
  };

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

          <InputField
            placeholder="Email Address"
            type="email"
            field={emailAddress}
            setField={setEmailAddress}
          />

          <InputField
            placeholder="Password"
            type="password" // Changed type to password for security
            field={password}
            setField={setPassword}
          />

          <p style={{ margin: ".6rem 0" }}>
            Don't have an account? <Link to={"/user-register"}>Sign Up</Link>
          </p>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show py-2 px-3 fw-medium"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <Button variant="primary" width={100} onClick={handleLogin}>
            {loading ? "Signing In..." : "Login"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
