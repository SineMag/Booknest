import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../../store";
import { updateUserProfile } from "../../features/userSlice";

const UserProfile: React.FC = () => {
  const userProfile = useSelector(
    (state: RootState) =>
      state.user?.user ?? {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        physicalAddress: "",
      }
  );

  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [emailAddress, setEmailAddress] = useState(userProfile.emailAddress);
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber);
  const [physicalAddress, setPhysicalAddress] = useState(
    userProfile.physicalAddress
  );

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateProfile = () => {
    dispatch(
      updateUserProfile({
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        physicalAddress,
        profileImage,
      })
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setProfileImage(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <style>
        {`
          .loginPage {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1.5rem 0;
            width: 100%;
            min-height: 85vh;
            background: #f5f6fa;
          }

          .loginContainer {
            width: 300px;
            background: #ffffff;
            padding: 1.5rem;
            border-radius: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .loginContainer h2 {
            text-align: center;
            margin-bottom: 1rem;
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
          }

          .profile-image-wrapper {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #ddd;
            margin-bottom: 0.5rem;
          }

          .profile-image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .upload-button {
            margin-bottom: 1rem;
            padding: 6px 12px;
            font-size: 14px;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .upload-button:hover {
            background-color: #0056b3;
          }

          .hidden-file-input {
            display: none;
          }

          .loginContainer button {
            margin-top: 12px;
            width: 100% !important;
            border-radius: 8px;
            padding: 8px 0;
          }
        `}
      </style>

      <Navbar />

      <div className="loginPage">
        <div className="loginContainer">
          <h2>User Profile</h2>

          {/* Profile Image */}
          <div className="profile-image-wrapper">
            <img
              src={
                profileImage ||
                "https://via.placeholder.com/100x100.png?text=Profile"
              }
              alt="Profile"
            />
          </div>

          {/* Upload Button Outside */}
          <label className="upload-button">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden-file-input"
              onChange={handleImageChange}
            />
          </label>

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
            type="text"
            field={emailAddress}
            setField={setEmailAddress}
          />

          <InputField
            placeholder="Phone Number"
            type="text"
            field={phoneNumber}
            setField={setPhoneNumber}
          />

          <InputField
            placeholder="Physical Address"
            type="text"
            field={physicalAddress}
            setField={setPhysicalAddress}
          />

          <Button variant="primary" width={100} onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
