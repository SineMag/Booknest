import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import type { Admin } from "../../types/Admin";
import { registerAdmin } from "../../features/adminSlice";
import { setLocalAdmin } from "../../utils/LocalStorage";

export default function AdminRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { admin, loading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    console.log("admin", admin);

    if (error) {
      console.log(error);
    }

    if (admin) {
      setLocalAdmin(admin);
      navigate("/admin-dashboard");
    }
  }, [admin, error]);

  const handleRegister = () => {
    const payload: Admin = {
      firstName,
      lastName,
      emailAddress,
      password,
      physicalAddress,
      phoneNumber,
    };
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }
    dispatch(registerAdmin(payload));
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    background: "#f0f4f8",
    minHeight: "calc(100vh - 64px)",
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
            placeholder="Physical Address"
            type="text"
            field={physicalAddress}
            setField={setPhysicalAddress}
          />
          <InputField
            placeholder="Email Address"
            type="text"
            field={emailAddress}
            setField={setEmailAddress}
          />
          <InputField
            placeholder="Phone Number"
            type="text"
            field={phoneNumber}
            setField={setPhoneNumber}
          />

          {/* Password (InputField provides its own toggle) */}
          <InputField
            placeholder="Password"
            type="password"
            field={password}
            setField={setPassword}
          />

          {/* Confirm Password (InputField provides its own toggle) */}
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

          <Button
            variant="primary"
            style={buttonStyle}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}
