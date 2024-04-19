import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AuthStyles.css";
import { useDoctorAuth } from "../../context/docauth";
import { RingLoader } from "react-spinners";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DoctorAuth, setDoctorAuth] = useDoctorAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);

      // Validate if email and password are provided
      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }

      // API call to authenticate doctor login
      const res = await axios.post("/api/v1/auth/doc-login", {
        email,
        password,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (res && res.data.success) {
        console.log(res.data);
        toast.success(res.data && res.data.message);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Set authentication details upon successful login
        setDoctorAuth({
          ...DoctorAuth,
          doctor: res.data.doctor,
          token: res.data.token,
        });
        localStorage.setItem("DoctorAuth", JSON.stringify(res.data));
        navigate(location.state || "/dashboard/doctor-home");
      } else {
        // Display error message if login is unsuccessful
        toast.error(
          res.data.message ||
            "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      // Display specific error messages based on error type
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        if (error.response.status === 401) {
          toast.error(
            "Unauthorized access. Please check your credentials and try again."
          );
        } else {
          toast.error(`Server Error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error(
          "No response received from the server. Please try again later."
        );
      } else {
        // Something else happened while setting up the request
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Layout title="Doctor Login - CureConnect">
      <div
        className="form-container"
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h4 className="title">Doctor Login Form</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="useremail"
              placeholder="Enter Your Email "
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
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            {isLoggingIn ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <RingLoader color="hsla(283, 87%, 48%, 1)" size={35} />
                <span style={{ marginLeft: "5px" }}> LOGGING IN...</span>
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default DoctorLogin;
