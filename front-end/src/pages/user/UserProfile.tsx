import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/userSlice";
import type { User } from "../../features/userSlice";
import ImageUploader from "../../components/image/ImageUploader";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./UserProfile.module.css";
import type { AppDispatch, RootState } from "../../../store";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);

  // Local states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Load user data on mount
  useEffect(() => {
    console.log("UserProfile user:", user);
    if (user) {
      setFirstName(user.firstName || user.first_name || "");
      setLastName(user.lastName || user.last_name || "");
      setEmail(user.emailAddress || user.email || "");
      setPhone(user.phoneNumber || user.phone || "");
      setPhysicalAddress(user.physicalAddress || user.address || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    setIsUpdating(true);
    try {
      const updatedUser: User = {
        ...user,
        firstName,
        lastName,
        emailAddress: email,
        phoneNumber: phone,
        physicalAddress,
      };
      await dispatch(updateProfile(updatedUser));
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>User Profile</h2>
          <p>Please log in to view and update your profile.</p>
        </div>
      </div>
    );
  }

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
            field={email}
            setField={setEmail}
          />
          <InputField
            placeholder="Phone Number"
            type="text"
            field={phone}
            setField={setPhone}
          />
          <InputField
            placeholder="Physical Address"
            type="text"
            field={physicalAddress}
            setField={setPhysicalAddress}
          />

          <Button onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
