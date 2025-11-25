import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import ImageUploader from "../../components/image/ImageUploader";

const UserProfile: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ImageUploader />
      <Footer />
    </div>
  );
};

export default UserProfile;
