import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import ImageUploader from "../../components/image/ImageUploader";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import styles from "./UserProfile.module.css";

const UserProfile: React.FC = () => {
  // Local states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <Navbar />

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
            field={phone}
            setField={setPhone}
          />


          <Button onClick={() => {}}>Update</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
