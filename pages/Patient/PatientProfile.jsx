// PatientProfile.js

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { usePatientAuth } from "../../context/Patientauth";
import fetchPatientImage from "./fetchPatientImage";
import "../../styles/PatientProfile.css";
import PhotoUploadForm from "./PhotoUploadForm";

const PatientProfile = () => {
  const [PatientAuth, setPatientAuth] = usePatientAuth();
  const patientId = PatientAuth?.patient?._id;
  const { name, phone, email, gender, age, location } =
    PatientAuth?.patient || {};
  const [patientImageUrl, setPatientImageUrl] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Fetch patient image
    const fetchImage = async () => {
      const imageUrl = await fetchPatientImage(patientId);
      if (imageUrl) {
        setPatientImageUrl(imageUrl);
      }
    };
    fetchImage();
  }, [patientId]);

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="profile-form">
        <h1 className="text-center mb-4" style={{ color: "#00374b" }}>
          Your Profile
        </h1>
        <div className="form-content">
          <div className="left-section">
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Phone:</strong> {phone}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Age:</strong> {age}
              </p>
              <p>
                <strong>Location:</strong> {location}
              </p>
            </div>
          </div>
          <div className="right-section">
            <div className="profile-image-container">
              {patientImageUrl ? (
                <img src={patientImageUrl} alt="Patient" />
              ) : (
                <div className="no-image">No image available</div>
              )}
              <label htmlFor="upload-image" className="upload-image-label">
                <i className="fas fa-camera"></i>
              </label>
              <input
                type="file"
                id="upload-image"
                style={{ display: "none" }}
              />
            </div>
            <div className="image-buttons">
              <button
                className="change-image-btn"
                onClick={handleFormToggle}
                style={{ color: "#fff" }}
              >
                {patientImageUrl ? "Update Image" : "Upload Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isFormVisible && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content">
            <span className="close" onClick={handleFormToggle}>
              &times;
            </span>
            <PhotoUploadForm />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PatientProfile;
