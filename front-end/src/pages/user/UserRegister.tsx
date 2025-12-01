import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../features/userSlice";
import { type AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import styles from "./UserRegister.module.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const UserRegister: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");

  // error states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    physicalAddress: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /** --------------------------------------------------
   * VALIDATE FORM
   * -------------------------------------------------- */
  const validateForm = () => {
    const newErrors: typeof errors = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      physicalAddress: "",
    };
    let valid = true;

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    }
    if (!physicalAddress.trim()) {
      newErrors.physicalAddress = "Physical address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  /** --------------------------------------------------
   * HANDLE REGISTER
   * -------------------------------------------------- */
  const handleRegister = () => {
    if (!validateForm()) return; // stop if form is invalid

    // Dispatch createUser action
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

    navigate("/login");
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>

        <InputField
          placeholder="First Name"
          type="text"
          field={firstName}
          setField={setFirstName}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}

        <InputField
          placeholder="Last Name"
          type="text"
          field={lastName}
          setField={setLastName}
        />
        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

        <InputField
          placeholder="Email Address"
          type="email"
          field={emailAddress}
          setField={setEmailAddress}
        />
        {errors.emailAddress && (
          <p className={styles.error}>{errors.emailAddress}</p>
        )}

        <InputField
          placeholder="Password"
          type="password"
          field={password}
          setField={setPassword}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <InputField
          placeholder="Confirm Password"
          type="password"
          field={confirmPassword}
          setField={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

        <InputField
          placeholder="Phone Number"
          type="number"
          field={phoneNumber}
          setField={setPhoneNumber}
        />
        {errors.phoneNumber && (
          <p className={styles.error}>{errors.phoneNumber}</p>
        )}

        <InputField
          placeholder="Physical Address"
          type="text"
          field={physicalAddress}
          setField={setPhysicalAddress}
        />
        {errors.physicalAddress && (
          <p className={styles.error}>{errors.physicalAddress}</p>
        )}

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
        <Button
          variant="primary"
          width={100}
          onClick={handleRegister}
          disabled={
            !firstName ||
            !lastName ||
            !emailAddress ||
            !password ||
            !confirmPassword ||
            !phoneNumber ||
            !physicalAddress
          }
        >
          Register
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
            onClick={() => alert("Facebook Login Button/Icon (not functional)")}
          >
            <FaFacebook size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
