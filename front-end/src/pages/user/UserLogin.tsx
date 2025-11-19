import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

const UserLogin: React.FC = () => {
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginPage">
      <div className="loginContainer">
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
        <Button variant="primary">Login</Button>
      </div>
    </div>
  );
};

export default UserLogin;
