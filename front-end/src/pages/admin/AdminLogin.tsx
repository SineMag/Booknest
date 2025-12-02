import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { setLocalUser } from "../../utils/LocalStorage";
import { type LoginCredentials } from "../../features/userSlice";
import { loginAdmin } from "../../features/adminSlice";

const AdminLogin: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { admin, loading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    if (admin && !loading && !error) {
      setLocalUser(admin);
      navigate("/admin-dashboard");
    }
    if (error) console.log(error);
    if (loading) console.log("loading...");
  }, [admin, loading, error]);

  const handleLogin = () => {
    const payload: LoginCredentials = { emailAddress, password };
    dispatch(loginAdmin(payload));
  };

  /* parent-level icon removed; InputField handles its own toggle */

  return (
    <>
      <div className="loginPage">
        <div className="loginContainer">
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Admin Login
          </h2>

          <InputField
            placeholder="Email Address"
            type="email"
            field={emailAddress}
            setField={setEmailAddress}
          />

          {/* PASSWORD FIELD (InputField provides its own show/hide toggle) */}
          <InputField
            placeholder="Password"
            type="password"
            field={password}
            setField={setPassword}
          />

          <div style={{ marginTop: ".5rem" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <span> Remember me</span>
          </div>

          <Button variant="primary" width={100} onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
