import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AuthStyles.css";

import { RingLoader } from "react-spinners";

const PatientRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");

  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track whether OTP is sent
  const [isRegistering, setIsRegistering] = useState(false); // State to track whether registration is in progress
  const navigate = useNavigate();

  // Function to generate OTP and send it to the user's email
  const generateAndSendOtp = async () => {
    try {
      setIsRegistering(true);
      // Disable all fields once OTP is sent
      if (
        !name ||
        !phone ||
        !email ||
        !password ||
        !gender ||
        !age ||
        !location
      ) {
        toast.error("All fields are required");
        return;
      }

      const res = await axios.post("/api/v1/auth/otp-gen", {
        name,
        phone,
        email,
        password,
        gender,
        age,
        location,
        photo,
      });
      if (res && res.data.success) {
        toast.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        toast.error(res.data.message);
        // If OTP sending failed, enable the fields again
        setNameDisabled(false);
        setEmailDisabled(false);
        setPasswordDisabled(false);
        setPhoneDisabled(false);
        setAgeDisabled(false);
        setLocationDisabled(false);
        setGenderDisabled(false);
        setPhoto(false);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
      setNameDisabled(false);
      setEmailDisabled(false);
      setPasswordDisabled(false);
      setPhoneDisabled(false);
      setAgeDisabled(false);
      setLocationDisabled(false);
      setGenderDisabled(false);
      setPhoto(false);
    } finally {
      setIsRegistering(false);
    }
  };

  // Function to handle the registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Check if OTP is sent and entered
    if (!isOtpSent || !otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }

    try {
      setIsRegistering(true); // Start registration process

      const res = await axios.post("/api/v1/auth/register", {
        name,
        phone,
        email,
        password,
        gender,
        age,
        location,
        photo,

        otp,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        if (res.data.message === "Invalid OTP") {
          toast.error("Invalid OTP. Please enter the correct OTP.");
        } else if (res.data.message === "Email is already registered") {
          toast.error(
            "This email is already registered. Please use a different email."
          );
        } else {
          toast.error(res.data.message);
        }
      }
    } finally {
      setIsRegistering(false); // Registration process completed
    }
  };

  // Define disabled state for each field
  const [nameDisabled, setNameDisabled] = useState(false);
  const [phoneDisabled, setPhoneDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [ageDisabled, setAgeDisabled] = useState(false);
  const [genderDisabled, setGenderDisabled] = useState(false);
  const [locationDisabled, setLocationDisabled] = useState(false);
  const [photoDisabled, setPhotoDisabled] = useState(false);

  return (
    <Layout title="Patient Registration">
      <div
        className="form-container"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleRegistration}>
          <h4 className="title">Patient Registration </h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="username"
              placeholder="Enter Your Name"
              required
              autoFocus
              disabled={nameDisabled}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="userphone"
              placeholder="Enter Your Phone"
              required
              disabled={phoneDisabled}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="useremail"
              placeholder="Enter Your Email"
              required
              disabled={emailDisabled}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              required
              disabled={passwordDisabled}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control"
              id="gender"
              placeholder="Enter Your Gender"
              required
              disabled={genderDisabled}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              id="user age"
              placeholder="Enter Your Age"
              required
              disabled={ageDisabled}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              id="location"
              placeholder="Your Location(Enter District,State)"
              required
              disabled={locationDisabled}
            />
          </div>

          {isOtpSent ? (
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
                id="exampleInputOtp"
                placeholder="Enter OTP"
                required
              />
              <button
                onClick={handleRegistration}
                type="submit"
                className="btn btn-primary rounded-pill"
              >
                {isRegistering ? (
                  <>
                    <RingLoader color="hsla(283, 87%, 48%, 1)" size={35} />
                    <span style={{ marginLeft: "5px" }}> REGISTERING...</span>
                  </>
                ) : (
                  "REGISTER"
                )}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={generateAndSendOtp}
              className={`btn btn-primary rounded-pill ${
                isRegistering ? "disabled" : ""
              }`}
              disabled={isRegistering}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isRegistering ? (
                <>
                  <RingLoader color="hsla(283, 87%, 48%, 1)" size={35} />
                  <span style={{ marginLeft: "5px" }}> SENDING OTP...</span>
                </>
              ) : (
                "SEND OTP"
              )}
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default PatientRegister;
