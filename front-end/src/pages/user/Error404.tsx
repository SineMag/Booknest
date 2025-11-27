import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Error404.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";

const Error404 = () => {
  return (
    <div>
      {" "}
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>Page Not Found</h2>

        <p className={styles.text}>
          It looks like nothing was found at this location.
        </p>

        <Link to="/" style={{ marginTop: "30px" }}>
          <Button variant="primary">BACK TO HOME</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Error404;
