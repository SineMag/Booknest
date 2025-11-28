import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Filter from "../../components/Filter/Filter";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

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

  useEffect(() => {
    if (user && isLoggedIn) {
      console.log("Logged-in user:", user);
      setLocalUser(user);
      navigate("/adminDashboard");
    } else {
      setLocalUser({});
    }
  }, [user, isLoggedIn, navigate]);

  const handleLogin = () => {
    console.log("Logging in admin...");
    dispatch(
      loginUser({
        emailAddress,
        password,
      })
    );
  };

  return (
    <>
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
    </>
  );
};

export default AdminLogin;
