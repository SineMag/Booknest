import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { loginUser } from "../../features/userSlice";
import { setLocalUser } from "../../utils/LocalStorage";
import styles from "./UserLogin.module.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const UserLogin: React.FC = () => {
  // form states
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  /** --------------------------------------------------
   * AUTO SAVE REMEMBERED USER
   * -------------------------------------------------- */
  useEffect(() => {
    if (user && isLoggedIn) {
      setLocalUser(user);

      if (rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({ emailAddress, password })
        );
      } else {
        localStorage.removeItem("rememberedUser");
      }
    } else {
      setLocalUser({});
    }
  }, [user, isLoggedIn, rememberMe, emailAddress, password]);

  /** --------------------------------------------------
   * VALIDATE FORM
   * -------------------------------------------------- */
  const validateForm = () => {
    let valid = true;

    if (!emailAddress.trim()) {
      setEmailError("Email address is required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  /** --------------------------------------------------
   * HANDLE LOGIN
   * -------------------------------------------------- */
  const handleLogin = async () => {
    if (!validateForm()) return; // stop if invalid

    try {
      const resultAction = await dispatch(
        loginUser({ emailAddress, password })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } else {
        setLoginError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

        {/* EMAIL INPUT */}
        <InputField
          placeholder="Email Address"
          type="email"
          field={emailAddress}
          setField={setEmailAddress}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}

        {/* PASSWORD INPUT */}
        <InputField
          placeholder="Password"
          type="password"
          field={password}
          setField={setPassword}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}

        {/* Remember Me */}
        <div style={{ marginTop: ".6rem" }}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <span> Remember me</span>
        </div>

        {/* Login error */}
        {loginError && <p className={styles.error}>{loginError}</p>}

        {/* Signup link */}
        <p style={{ margin: ".6rem 0" }}>
          Don't have an account? <Link to={"/register"}>Sign Up</Link>
        </p>

        {/* LOGIN BUTTON */}
        <Button
          variant="primary"
          width={100}
          onClick={handleLogin}
          disabled={!emailAddress.trim() || !password.trim()}
        >
          Login
        </Button>

        <p style={{ textAlign: "center", margin: "1rem 0" }}>OR</p>

        {/* OAuth */}
        <div className={styles.oauthIcons}>
          <a
            href="#"
            onClick={() => alert("Google Login Button/Icon (not functional)")}
          >
            <FaGoogle size={30} />
          </a>
          <a
            href="#"
            onClick={() => alert("Facebook Login Button/Icon (not functional)")}
          >
            <FaFacebook size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
