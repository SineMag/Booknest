import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { loginUser } from "../../features/userSlice";
import { setLocalUser } from "../../utils/LocalStorage";
import Filter from "../../components/Filter/Filter";

const UserLogin: React.FC = () => {
  // states
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (user && isLoggedIn) {
      setLocalUser(user);
      navigate("/dashboard"); // Navigate automatically if user is logged in
    } else {
      setLocalUser({});
    }
  }, [user, isLoggedIn, navigate]);

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
      <Navbar />

      <div className="loginPage">
        <div className="loginContainer">
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

          <InputField
            placeholder="Email Address"
            type="email"
            field={emailAddress}
            setField={setEmailAddress}
          />

          <InputField
            placeholder="Password"
            type="password"
            field={password}
            setField={setPassword}
          />

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

          <Button variant="primary" width={100} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserLogin;
