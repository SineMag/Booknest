import React, { useState, useEffect } from "react";
import ImageUploader from "../../components/image/ImageUploader";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./UserProfile.module.css";

const UserProfile: React.FC = () => {
  // Local state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");

  // Validation & message state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Prefill from localStorage (replace with Redux if needed)
  // Prefill data from Redux/localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (storedUser) {
      setFirstName(storedUser.firstName || "");
      setLastName(storedUser.lastName || "");
      setEmail(storedUser.emailAddress || "");
      setPhone(storedUser.phoneNumber || "");
      setPhysicalAddress(storedUser.physicalAddress || "");
    }
  }, []);

  // Validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^\d{7,15}$/.test(phone))
      newErrors.phone = "Invalid phone number";
    if (!physicalAddress.trim())
      newErrors.physicalAddress = "Physical Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;

    const updatedUser = {
      firstName,
      lastName,
      emailAddress: email,
      phoneNumber: phone,
      physicalAddress,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setSuccessMessage("Profile updated successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <h2 className={styles.profileTitle}>User Profile</h2>

        <div className={styles.profileContent}>
          {/* Left column: Image */}
          <div className={styles.imageSection}>
            <ImageUploader />
            <p className={styles.editHint}>Click to change profile picture</p>
          </div>

          {/* Right column: Form */}
          <div className={styles.formSection}>
            <InputField
              placeholder="First Name"
              type="text"
              field={firstName}
              setField={setFirstName}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}

            <InputField
              placeholder="Last Name"
              type="text"
              field={lastName}
              setField={setLastName}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}

            <InputField
              placeholder="Email Address"
              type="email"
              field={email}
              setField={setEmail}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}

            <InputField
              placeholder="Phone Number"
              type="text"
              field={phone}
              setField={setPhone}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}

            <InputField
              placeholder="Physical Address"
              type="text"
              field={physicalAddress}
              setField={setPhysicalAddress}
            />
            {errors.physicalAddress && (
              <span className={styles.error}>{errors.physicalAddress}</span>
            )}

            {successMessage && (
              <div className={styles.success}>{successMessage}</div>
            )}

            <Button onClick={handleUpdate} variant="primary" width={100}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
