import React, { useState } from "react";
import styles from "../Registration/Registration.module.css";
import RegistrationValidation from "./RegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    phone: "", // Add a phone field
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Wait until the errors are set
    const validationErrors = RegistrationValidation(values);
    setErrors(validationErrors);

    console.log(values);

    // Use async/await to ensure state is updated

    console.log(validationErrors);
    if (
      validationErrors.name === "" &&
      validationErrors.phone === "" && // Update to check phone errors
      validationErrors.password === ""
    ) {
      try {
        axios.post("http://localhost:3001/signup", values).then((res) => {
          console.log("here");
          if (res.data === "success") {
            navigate("/login");
            alert("আপনি সফলভাবে নিবন্ধন করেছেন");
          } else if (res.data === "phone") {
            alert("আপনার ফোন নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে");
            navigate("/signup");
          } else {
            alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
          }
        });
      } catch (error) {
        console.error("Error while Registration in:", error);
      }
    } else {
      // Display an error message to the user
      alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  };

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.container} id="container">
        <div
          className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
        >
          <form action="" onSubmit={handleSubmit}>
            <h1>নতুন একাউন্ট তৈরি করুন</h1>
            <div className={styles.infield}>
              <input
                type="text"
                placeholder="নাম"
                id="name"
                name="name"
                onChange={handleInput}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>
            <div className={styles.infield}>
              <input
                type="tel" // Use tel type for phone input
                placeholder="ফোন" // Update placeholder
                id="phone"
                name="phone" // Update name
                onChange={handleInput}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                placeholder="পাসওয়ার্ড"
                id="password"
                name="password"
                onChange={handleInput}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            <button type="submit" className={styles.button}>
              রেজিস্ট্রেশন
            </button>
          </form>
        </div>
        <div className={`${styles["overlay-container"]}`} id="overlayCon">
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <div className={styles["background-image"]} />
              <h1>শাবিপ্রবি অটোরিকশা ম্যানেজমেন্ট সিস্টেম</h1>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <mark>
          Learn more on{" "}
          <a href="https://github.com/Sumonta056/SUST-Autorickshaw-Management-System">
            Github
          </a>
        </mark>
      </footer>
    </div>
  );
}

export default Registration;
