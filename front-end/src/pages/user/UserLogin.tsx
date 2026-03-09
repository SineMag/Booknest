import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { loginUser } from "../../features/userSlice";
import { setLocalUser } from "../../utils/LocalStorage";
import styles from "./UserLogin.module.css";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import icons..react

const UserLogin: React.FC = () => {
  // states
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (user && isLoggedIn) {
      setLocalUser(user);
      if (rememberMe) {
        try {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ emailAddress, password })
          );
        } catch (e) {
          // ignore
        }
      } else {
        localStorage.removeItem("rememberedUser");
      }
    } else {
      setLocalUser({});
    }
  }, [user, isLoggedIn, rememberMe, emailAddress, password]);

  useEffect(() => {
    validateForm();
  }, [emailAddress, password]);

  const validateForm = () => {
    const newErrors = {
      emailAddress: "",
      password: "",
    };

    if (!emailAddress) newErrors.emailAddress = "Email address is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((error) => error === ""));
  };

  const handleLogin = () => {
    dispatch(
      loginUser({
        emailAddress,
        password,
      })
    );
    // Navigate after dispatching login
    navigate("/dashboard");
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
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <div>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span> Remember me</span>
          </div>

          <p style={{ margin: ".6rem 0" }}>
            Don't have an account? <Link to={"/register"}>Sign Up</Link>
          </p>

          <Button variant="primary" width={100} onClick={handleLogin} disabled={!isFormValid}>
            Login
          </Button>

          <p style={{ textAlign: "center", margin: "1rem 0" }}>OR</p>

          <div className={styles.oauthIcons}>
            <a
              href="#"
              onClick={() => alert("Google Login Button/Icon (not functional)")}
            >
              <FaGoogle size={30} />
            </a>
            <a
              href="#"
              onClick={() =>
                alert("Facebook Login Button/Icon (not functional)")
              }
            >
              <FaFacebook size={30} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
