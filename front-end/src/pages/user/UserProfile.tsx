import React, { useState, useEffect } from "react";
import ImageUploader from "../../components/image/ImageUploader";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./UserProfile.module.css";
import { getUserDetails, updateUserDetails } from "../../service/api";
import type { User } from '../../features/userSlice';
import SnackbarComponent from "../../components/Snackbar/snackbar";

const UserProfile: React.FC = () => {
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

  useEffect(() => {
    const fetchUserData = async () => {
      const userString = localStorage.getItem("user");
      let currentUserId: string | undefined;

      if (userString) {
        const user: User = JSON.parse(userString);
        currentUserId = user.id?.toString();
      }

      if (!currentUserId) {
        setError("User not logged in or user ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await getUserDetails();
        const userData = response.data;

        if (userData) {
          setFirstName(userData.firstname || "");
          setLastName(userData.lastname || "");
          setEmail(userData.emailaddress || "");
          setPhone(userData.phonenumber || "");
          setPhysicalAddress(userData.physicaladdress || "");
        } else {
          setError("No user data returned from the API.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Profile update handler for user
  const handleUpdateProfile = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const payload = {
        firstname: firstName,
        lastname: lastName,
        phonenumber: phone,
        physicaladdress: physicalAddress,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      };
      await updateUserDetails(payload);
      setShowSnackbar(true);
    } catch (err) {
      console.error("Update failed:", err);
      <SnackbarComponent message="Profile update failed." show={true} onClose={() => {}} />;
    }
  };

  if (loading) {
    return <div className={styles.profilePage}><p>Loading user profile...</p></div>;
  }

  if (error) {
    return <div className={styles.profilePage}><p style={{ color: "red" }}>{error}</p></div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <h1 className={styles.profileTitle}>User Profile</h1>

        <div className={styles.imageLeftWrapper}>
          <ImageUploader />
        </div>

        <InputField placeholder="First Name" type="text" field={firstName} setField={setFirstName} />
        <InputField placeholder="Last Name" type="text" field={lastName} setField={setLastName} />

        {/* readOnly email */}
        <InputField placeholder="Email Address" type="email" field={email} setField={setEmail} readOnly />

        <InputField placeholder="Phone Number" type="text" field={phone} setField={setPhone} />
        <InputField placeholder="Physical Address" type="text" field={physicalAddress} setField={setPhysicalAddress} />

        <h3>Change Password</h3>
        <InputField placeholder="Current Password" type="password" field={currentPassword} setField={setCurrentPassword} />
        <InputField placeholder="New Password" type="password" field={newPassword} setField={setNewPassword} />
        <InputField placeholder="Confirm New Password" type="password" field={confirmNewPassword} setField={setConfirmNewPassword} />
        <Button onClick={handleUpdateProfile}>Update Profile</Button>
      </div>
      <SnackbarComponent message="Profile updated successfully!" show={showSnackbar} onClose={() => setShowSnackbar(false)} />
    </div>
  );
};
;

export default UserProfile;
