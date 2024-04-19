import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { usePatientAuth } from "../../context/Patientauth";

const PhotoUploadForm = () => {
  const [PatientAuth, setPatientAuth] = usePatientAuth();
  const patient = PatientAuth?.patient?._id; // Assuming useAuth provides the patient object
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      toast.error("Please select a photo to upload");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("patientId", patient); // Stringify the patient ID

      // Make a POST request to the backend endpoint
      const res = await axios.post("/api/v1/auth/up-pat-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res && res.data.success) {
        toast.success("Photo uploaded successfully");
        navigate("/dashboard/patient-profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to upload photo");
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card border-primary">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Upload Photo</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control-file mb-2"
                    accept="image/*"
                    required
                  />
                  {photo && (
                    <div className="mb-2">
                      <strong>Selected file:</strong> {photo.name}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success rounded-pill px-4"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Photo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
