import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

export default function AdminRegister() {
  // --- Form State ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [workEmailAddress, setWorkEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Submit Handler ---
  const handleRegister = () => {
    console.log("Registering admin...", {
      firstName,
      lastName,
      userName,
      workEmailAddress,
      password,
      confirmPassword,
    });
    // TODO: Dispatch Redux action or call API
  };

  // --- Inline Styles ---
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    background: "#f0f4f8",
    minHeight: "calc(100vh - 64px)", // subtract navbar height if needed
  };

  const formWrapperStyle = {
    width: "600px",
    padding: "40px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center" as const,
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: 600,
    color: "#1e293b",
  };

  const infoTextStyle = {
    marginTop: "10px",
    fontSize: "0.95rem",
    textAlign: "start" as const,
    color: "#475569",
  };

  const linkStyle = {
    fontWeight: "600",
    color: "#1d4ed8",
    textDecoration: "underline",
  };

  const buttonStyle = {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={formWrapperStyle}>
          <h2 style={headingStyle}>Admin Register</h2>

          <InputField
            placeholder="First Name"
            type="text"
            field={firstName}
            setField={setFirstName}
          />

          <InputField
            placeholder="Last Name"
            type="text"
            field={lastName}
            setField={setLastName}
          />

          <InputField
            placeholder="Username"
            type="text"
            field={userName}
            setField={setUserName}
          />

          <InputField
            placeholder="Work Email Address"
            type="text"
            field={workEmailAddress}
            setField={setWorkEmailAddress}
          />

          <InputField
            placeholder="Password"
            type="password"
            field={password}
            setField={setPassword}
          />

          <InputField
            placeholder="Confirm Password"
            type="password"
            field={confirmPassword}
            setField={setConfirmPassword}
          />

          <p style={infoTextStyle}>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>
              Sign In
            </Link>
          </p>
          <Link to="/login">
            <Button
              variant="primary"
              style={buttonStyle}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
