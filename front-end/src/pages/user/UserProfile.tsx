import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ImageUploader from "../../components/image/ImageUploader";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./UserProfile.module.css";
import { updateUserDetails } from "../../service/api";
import type { RootState } from "../../../store";
import SnackbarComponent from "../../components/Snackbar/snackbar";
import type { IUser, User } from "../../types/User";
import { getLocalUser } from "../../utils/LocalStorage";
import Spinner from "../../components/Spinner";
import LoadingOverlay from "../../components/Loading";

const UserProfile: React.FC = () => {
  const { current } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [user, setUser] = useState<User | IUser | null>(null);

  console.log(606, { user });

  async function getUser() {
    if (current && current.id) {
      setUser(current);
      return;
    }
    const user = await getLocalUser();

    if (user && user.id) {
      setUser(user);
      return;
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(88888, { user });
    if (user && user.id) {
      // PostgreSQL returns lowercase column names
      setFirstName((user as any).firstname || (user as any).firstName);
      setLastName((user as any).lastname || (user as any).lastName);
      setEmail((user as any).emailaddress || (user as any).emailAddress);
      setPhone((user as any).phonenumber || (user as any).phoneNumber);
      setPhysicalAddress(
        (user as any).physicaladdress || (user as any).physicalAddress,
      );
      console.log("User data loaded successfully:", user);
      setLoading(false);
      setError(null);
    } else {
      setError("No user data returned from the API.");
    }
  }, [user]);

  // Profile update handler for user
  const handleUpdateProfile = async () => {
    if (!user || !user.id) {
      setError("User ID not found.");
      return;
    }

    // Validate passwords match if new password is provided
    if (newPassword && newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        phoneNumber: phone,
        physicalAddress: physicalAddress,
        profilePicUrl: "",
        password: newPassword || user.password, // Use new password if provided, otherwise keep old
      };

      console.log("Updating user with payload:", payload);
      await updateUserDetails(user.id, payload);
      setShowSnackbar(true);
      setError(null);
      // Clear password fields after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Update failed:", err);
      setError("Profile update failed.");
    }
  };

  if (loading) {
      return <LoadingOverlay message="Loading..." />;
    }

  if (error) {
    return (
      <div className={styles.profilePage}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <h1 className={styles.profileTitle}>User Profile</h1>

        <div className={styles.imageLeftWrapper}>
          <ImageUploader />
        </div>

        <InputField
          label="First Name"
          placeholder="First Name"
          type="text"
          field={firstName}
          setField={setFirstName}
        />
        <InputField
          label="Last Name"
          placeholder="Last Name"
          type="text"
          field={lastName}
          setField={setLastName}
        />

        {/* readOnly email */}
        <InputField
          label="Email Address"
          placeholder="Email Address"
          type="email"
          field={email}
          setField={setEmail}
          readOnly
        />

        <InputField
          label="Phone Number"
          placeholder="Phone Number"
          type="text"
          field={phone}
          setField={setPhone}
        />
        <InputField
          label="Physical Address"
          placeholder="Physical Address"
          type="text"
          field={physicalAddress}
          setField={setPhysicalAddress}
        />

        <h3>Change Password</h3>
        <InputField
          placeholder="Current Password"
          type="password"
          field={currentPassword}
          setField={setCurrentPassword}
        />
        <InputField
          placeholder="New Password"
          type="password"
          field={newPassword}
          setField={setNewPassword}
        />
        <InputField
          placeholder="Confirm New Password"
          type="password"
          field={confirmNewPassword}
          setField={setConfirmNewPassword}
        />
        <Button onClick={handleUpdateProfile}>Update Profile</Button>
      </div>
      <SnackbarComponent
        message="Profile updated successfully!"
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
};
export default UserProfile;
