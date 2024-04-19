import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AuthStyles.css";

import { RingLoader } from "react-spinners";

const DoctorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const generateAndSendOtp = async () => {
    try {
      setIsRegistering(true);
      if (
        !name ||
        !phone ||
        !email ||
        !password ||
        !gender ||
        !age ||
        !location ||
        !experience ||
        !specialization
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
        experience,
        specialization,
      });
      if (res && res.data.success) {
        toast.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(
          "Email is already registered. Please use a different email."
        );
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!isOtpSent || !otp) {
      toast.error("Please enter the OTP sent to your email.");
      return;
    }

    try {
      setIsRegistering(true);

      const res = await axios.post("/api/v1/auth/doc-register", {
        name,
        phone,
        email,
        password,
        gender,
        age,
        location,
        experience,
        specialization,
        otp,
      });

      if (res && res.data.success) {
        console.log(res.data);
        const doctorId = res.data.doctor._id; // Assuming the ID is returned in res.data.id
        toast.success(res.data.message);
        navigate(`/files-upload?id=${doctorId}`); // Pass the ID as a query parameter
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid OTP. Please enter the correct OTP.");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Layout title="Doctor Registration">
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
        <form onSubmit={handleRegistration} noValidate>
          <h4 className="title">Doctor Registration </h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="username"
              placeholder="Enter Your Name"
              required
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
            />
          </div>
          <div className="mb-3">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control"
              id="gender"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="form-control"
              id="experience"
              placeholder="Enter Your Years Of Experience"
              required
            />
          </div>
          <div className="mb-3">
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="form-control"
              id="specialization"
              required
            >
              <option value="">Select Specialization</option>
              <option value="Physician">Physician</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Allergist/Immunologist">
                Allergist/Immunologist
              </option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              <option value="Hepatologist">Hepatologist</option>
              <option value="Pulmonologist">Pulmonologist</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Orthopedic Surgeon/Physiatrist">
                Orthopedic Surgeon/Physiatrist
              </option>
              <option value="Infectious Disease Specialist">
                Infectious Disease Specialist
              </option>
              <option value="Endocrinologist">Endocrinologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Colorectal Surgeon">Colorectal Surgeon</option>
              <option value="Emergency Medicine Specialist">
                Emergency Medicine Specialist
              </option>
              <option value="Vascular Surgeon">Vascular Surgeon</option>
              <option value="Rheumatologist">Rheumatologist</option>
              <option value="ENT Specialist">ENT Specialist</option>
              <option value="Urologist/Nephrologist">
                Urologist/Nephrologist
              </option>
              <option value="Ophthalmologist">Ophthalmologist</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Oncologist">Oncologist</option>
              <option value="Hematologist">Hematologist</option>
              <option value="Nephrologist">Nephrologist</option>
              <option value=" Gynecologist"> Gynecologist</option>
              <option value="Andrologist">Andrologist</option>
            </select>
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
                type="submit"
                className="btn btn-primary rounded-pill"
                disabled={isRegistering}
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

export default DoctorRegister;
