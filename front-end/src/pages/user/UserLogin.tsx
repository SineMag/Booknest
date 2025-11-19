import React from "react";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

const UserLogin: React.FC = () => {
  return (
    <div>
      <LoginForm />
        <Button onClick={() => console.log("User Login clicked")} variant="primary">
          Login
        </Button>
      
      
    </div>
  );
};

export default UserLogin;
