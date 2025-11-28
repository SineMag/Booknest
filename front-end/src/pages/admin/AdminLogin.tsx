import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Filter from "../../components/Filter/Filter";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

// react-icons not required here; InputField renders its own icons

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { setLocalUser } from "../../utils/LocalStorage";
import { loginUser } from "../../features/userSlice";

const AdminLogin: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // Load remembered admin credentials (if any) on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rememberedAdmin");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.emailAddress) setEmailAddress(parsed.emailAddress);
        if (parsed.username) setUsername(parsed.username);
        if (parsed.password) setPassword(parsed.password);
        setRememberMe(true);
      }
    } catch (err) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (user && isLoggedIn) {
      setLocalUser(user);
      // persist remembered credentials only after successful login
      if (rememberMe) {
        try {
          localStorage.setItem(
            "rememberedAdmin",
            JSON.stringify({ emailAddress, username, password })
          );
        } catch (e) {
          // ignore quota errors
        }
      } else {
        localStorage.removeItem("rememberedAdmin");
      }

      navigate("/adminDashboard");
    } else {
      setLocalUser({});
    }
  }, [
    user,
    isLoggedIn,
    navigate,
    rememberMe,
    emailAddress,
    username,
    password,
  ]);

  const handleLogin = () => {
    dispatch(
      loginUser({
        emailAddress,
        password,
      })
    );
  };

  /* parent-level icon removed; InputField handles its own toggle */

  return (
    <>
      <Navbar />

      <div className="loginPage">
        <div className="loginContainer">
          <Filter />

          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Admin Login
          </h2>

          <InputField
            placeholder="Email Address"
            type="email"
            field={emailAddress}
            setField={setEmailAddress}
          />

          <InputField
            placeholder="Username"
            type="text"
            field={username}
            setField={setUsername}
          />

          {/* PASSWORD FIELD (InputField provides its own show/hide toggle) */}
          <InputField
            placeholder="Password"
            type="password"
            field={password}
            setField={setPassword}
          />

          <div style={{ marginTop: ".5rem" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span> Remember me</span>
          </div>

          <Link to="/adminDashboard">
            <Button variant="primary" width={100} onClick={handleLogin}>
              Login
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminLogin;
