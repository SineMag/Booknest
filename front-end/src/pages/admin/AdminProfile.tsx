import React, { useEffect, useState } from "react";
import ImageUploader from "../../components/image/ImageUploader";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./AdminProfile.module.css";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../../features/adminSlice";
import { getLocalAdmin } from "../../utils/LocalStorage";

const AdminProfile: React.FC = () => {
  // Local states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { admin, loading, error } = useSelector(
    (state: RootState) => state.admin
  );

  useEffect(() => {
    const myAdmin = getLocalAdmin();

    if (myAdmin) {
      setFirstName(myAdmin.firstName);
      setLastName(myAdmin.lastName);
      setEmailAddress(myAdmin.emailAddress);
      setPhysicalAddress(myAdmin.physicalAddress);
      setPhoneNumber(myAdmin.phoneNumber);
      setPassword(myAdmin.password);
    }
  }, [admin]);

  const handleUpdate = () => {
    const payload = {
      firstName,
      lastName,
      emailAddress,
      physicalAddress,
      phoneNumber,
      password,
    };
    dispatch(updateAdmin(payload));
  };

  return (
    <div>
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>User Profile</h2>

          <div className={styles.imageLeftWrapper}>
            <ImageUploader />
          </div>

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
            placeholder="Email Address"
            type="email"
            field={emailAddress}
            setField={setEmailAddress}
          />

          <InputField
            placeholder="Physical Address"
            type="text"
            field={physicalAddress}
            setField={setPhysicalAddress}
          />

          <InputField
            placeholder="Phone Number"
            type="text"
            field={phoneNumber}
            setField={setPhoneNumber}
          />

          <InputField
            placeholder="Password"
            type="password"
            field={password}
            setField={setPassword}
          />

          <Button
            onClick={() => {
              handleUpdate;
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
