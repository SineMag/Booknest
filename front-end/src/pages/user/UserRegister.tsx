import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import Navbar from "../../components/NavBar/Navbar";
import Button from "../../components/Button/Button";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../features/userSlice";
import { type AppDispatch, type RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

const UserRegister: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  // state for email
  const [password, setPassword] = useState(""); // state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // state for confirm password
  const [phoneNumber, setPhoneNumber] = useState(""); // state for phone number
  const [physicalAddress, setPhysicalAddress] = useState(""); // state for physical address
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // useEffect
  // Removed redirect to allow access to register page

  const handleRegister = () => {
    console.log("registering user...");
    dispatch(
      createUser({
        firstName,
        lastName,
        emailAddress,
        password,
        phoneNumber,
        physicalAddress,
      })
    );
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="loginPage">
        <div className="loginContainer">
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Register
          </h2>
          <InputField
            placeholder="First Name"
            type="text"
            field={firstName} // current value
            setField={setFirstName} // setter function
          />
          <InputField
            placeholder="Last name"
            type="text"
            field={lastName} // current value
            setField={setLastName} // setter function
          />
          <InputField
            placeholder="email address"
            type="text"
            field={emailAddress} // current value
            setField={setEmailAddress} // setter function
          />
          <InputField
            placeholder="password"
            type="password"
            field={password} // current value
            setField={setPassword} // setter function
          />
          <InputField
            placeholder="confirm password"
            type="password"
            field={confirmPassword} // current value
            setField={setConfirmPassword} // setter function
          />
          <InputField
            placeholder="phone number"
            type="number"
            field={phoneNumber} // current value
            setField={setPhoneNumber} // setter function
          />
          <InputField
            placeholder="physical address"
            type="text"
            field={physicalAddress} // current value
            setField={setPhysicalAddress} // setter function
          />
          <p style={{ marginTop: "0.4rem", fontSize: "0.95rem" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                fontWeight: "600",
                color: "#000",
                textDecoration: "underline",
              }}
            >
              Sign In
            </Link>
          </p>
          <br />
          <Button variant="primary" width={100} onClick={handleRegister}>
            Register
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default UserRegister;
