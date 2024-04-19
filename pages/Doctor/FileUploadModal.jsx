import React, { useState } from "react";
import "../../styles/DoctorFilesUploadComponent.css"; // Import your CSS file
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorFilesUploadComponent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get("id");
  const [profilePic, setProfilePic] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [license, setLicense] = useState(null);
  const navigate = useNavigate();

  // Function to handle file upload and send data to the backend
  const handleFileUpload = async () => {
    // Check if all files are selected
    if (!profilePic || !idProof || !addressProof || !license) {
      alert("Please select all four files.");
      return;
    }

    try {
      // Assuming you have an API endpoint for uploading files
      const formData = new FormData();
      formData.append("doctorId", doctorId);

      // Assuming profilePic, idProof, addressProof, and license are file objects
      // Append each file under the "documents" field name
      formData.append("photo", profilePic);
      formData.append("idProof", idProof);
      formData.append("addressID", addressProof);
      formData.append("licenseID", license);
      alert("Are you sure?");
      // Make API call to backend for uploading doctor documents
      const response = await fetch("/api/v1/auth/doctorDocUpload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json(); // Assuming response is JSON
        // Show the message using toast
        alert(responseData.message);
        navigate("/");
        toast.success(responseData.message);
        // Optionally, you can perform additional actions after successful upload
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading the files.");
    }
  };

  // Function to handle file input change for profile pic
  const handleProfilePicChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  // Function to handle file input change for ID proof
  const handleIdProofChange = (event) => {
    setIdProof(event.target.files[0]);
  };

  // Function to handle file input change for address proof
  const handleAddressProofChange = (event) => {
    setAddressProof(event.target.files[0]);
  };

  // Function to handle file input change for license
  const handleLicenseChange = (event) => {
    setLicense(event.target.files[0]);
  };

  return (
    <div className="file-upload-container container">
      <div className="center-container">
        <h2>Upload Your Documents Here!</h2>
        <p>Doctor ID: {doctorId}</p>
        <p className="warning">
          Failure to upload proper documents will lead to rejection of your
          registration.
        </p>
        <form className="file-upload-form">
          <div className="form-group">
            <label htmlFor="profilePic">
              Profile Picture (face should be visible):
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              className="file-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="idProof">
              ID Proof (Aadhar/PAN/Driving License):
            </label>
            <input
              type="file"
              id="idProof"
              onChange={handleIdProofChange}
              className="file-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressProof">
              Address Proof (hospital location):
            </label>
            <input
              type="file"
              id="addressProof"
              onChange={handleAddressProofChange}
              className="file-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="license">License (government certification):</label>
            <input
              type="file"
              id="license"
              onChange={handleLicenseChange}
              className="file-input"
            />
          </div>
          <button
            type="button"
            onClick={handleFileUpload}
            className="upload-btn"
          >
            Upload Files
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorFilesUploadComponent;
