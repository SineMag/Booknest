import React, { useState } from 'react'
import InputField from '../../components/InputField/InputField'
import Navbar from '../../components/NavBar/Navbar'
import Button from '../../components/Button/Button'
import Footer from '../../components/footer/Footer'
import { Link } from 'react-router-dom'
const UserRegister: React.FC = () => {
  const [name, setName] = useState('')  // state for name
  const [email, setEmail] = useState('')  // state for email
  const [password, setPassword] = useState('')  // state for password
  const [confirmPassword, setConfirmPassword] = useState('')  // state for confirm password
  const [phoneNumber, setPhoneNumber] = useState('')  // state for phone number
  const [physicalAddress, setPhysicalAddress] = useState('')  // state for physical address
  return (
    <>
    <Navbar />
    <div className="loginPage">
      <div className="loginContainer">
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>
      <InputField
        placeholder="name"
        type="text"
        field={name}        // current value
        setField={setName}  // setter function
      />
      <InputField
        placeholder="Email"
        type="email"
        field={email}        // current value
        setField={setEmail}  // setter function
      />
      <InputField
        placeholder="password"
        type="password"
        field={password}        // current value
        setField={setPassword}  // setter function
      />
      <InputField
        placeholder="confirm password"
        type="confirm password"
        field={confirmPassword}        // current value
        setField={setConfirmPassword}  // setter function
      />
      <InputField
        placeholder="phone number"
        type="number"
        field={phoneNumber}        // current value
        setField={setPhoneNumber}  // setter function
      />
      <InputField
        placeholder="physical address"
        type="text"
        field={physicalAddress}        // current value
        setField={setPhysicalAddress}  // setter function
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
          <Link to={"/login"}>
          <Button variant="primary" width={100}>
            Register
          </Button>
          </Link>
      </div>
    </div>
    <Footer />
    </>
  )
}
export default UserRegister