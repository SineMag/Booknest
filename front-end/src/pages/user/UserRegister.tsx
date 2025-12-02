import React, { useState, useEffect } from "react";
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

  // state for email
  const [password, setPassword] = useState(""); // state for password
  const [confirmPassword, setConfirmPassword] = useState(""); // state for confirm password
  const [phoneNumber, setPhoneNumber] = useState(""); // state for phone number
  const [physicalAddress, setPhysicalAddress] = useState(""); // state for physical address
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    physicalAddress: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, emailAddress, password, confirmPassword, phoneNumber, physicalAddress]);

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      physicalAddress: "",
    };

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!emailAddress) newErrors.emailAddress = "Email address is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^0[0-9]{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be a 10-digit South African number starting with a 0";
    }
    if (!physicalAddress) newErrors.physicalAddress = "Physical address is required";

    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every((error) => error === ""));
  };

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
    navigate("/login");
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginContainer">
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Register
          </h2>
          <InputField
            placeholder="First Name *"
            type="text"
            field={firstName} // current value
            setField={setFirstName} // setter function
          />
          <InputField
            placeholder="Last name *"
            type="text"
            field={lastName} // current value
            setField={setLastName} // setter function
          />
          <InputField
            placeholder="Email address *"
            type="text"
            field={emailAddress} // current value
            setField={setEmailAddress} // setter function
          />
          <InputField
            placeholder="Password *"
            type="password"
            field={password} // current value
            setField={setPassword} // setter function
          />
          <InputField
            placeholder="Confirm password *"
            type="password"
            field={confirmPassword} // current value
            setField={setConfirmPassword} // setter function
          />
          <InputField
            placeholder="Phone number *"
            type="number"
            field={phoneNumber} // current value
            setField={setPhoneNumber} // setter function
          />
          <InputField
            placeholder="Physical address *"
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
          <Button variant="primary" width={100} onClick={handleRegister} disabled={!isFormValid}>
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
export default UserRegister;
