import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";

const PhotoUploadForm = () => {
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("/api/upload/photo", formData, config);

      if (res && res.data.success) {
        toast.success("Photo uploaded successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
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
    </Layout>
  );
};

export default PhotoUploadForm;
