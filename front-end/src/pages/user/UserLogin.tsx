import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";

const UserLogin: React.FC = () => {
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <Navbar />
      <div className="loginPage">
        <div className="loginContainer">
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
          <InputField
            placeholder="Email"
            type="email"
            field={username}
            setField={setUsername}
          />
          <InputField
            placeholder="Password"
            type="email"
            field={password}
            setField={setPassword}
          />
          <div>
            <input type="checkbox" onClick={() => setRememberMe(!rememberMe)} />
            <span> Remember me</span>
          </div>
          <p style={{ margin: ".6rem 0" }}>Don't have an account? Sign Up</p>
          <br />
          <Button variant="primary" width={100}>
            Login
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLogin;
