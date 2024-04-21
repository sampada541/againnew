import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDoctorAuth } from "../../context/docauth";
import fetchDoctorDocuments from "./fetchDoctorDocuments";
import "../../styles/DoctorProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorProfile = () => {
  const [DoctorAuth] = useDoctorAuth(); // Destructuring DoctorAuth from context directly
  const doctorId = DoctorAuth.doctor._id;
  const [doctorImageUrl, setDoctorImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchDoctorDocuments(doctorId, "photo");
      if (imageUrl) {
        setDoctorImageUrl(imageUrl);
      }
    };
    fetchImage();
  }, [doctorId]);

  const openDocumentProof = (doctorId, documentType) => {
    const fetchIdProof = async () => {
      try {
        // Fetch the image URL
        const imageUrl = await fetchDoctorDocuments(doctorId, documentType);

        // Create a new window
        const newWindow = window.open();

        // If the image URL is available, load it into the new window
        if (imageUrl) {
          // Create a new HTML document
          const documentContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${documentType}</title>
            </head>
            <body>
              <img src="${imageUrl}" alt="${documentType}" />
            </body>
            </html>
          `;

          // Write the HTML content to the new window
          newWindow.document.write(documentContent);
        } else {
          // If imageUrl is empty or undefined, display an error message
          newWindow.document.write(`Failed to fetch ${documentType}`);
        }
      } catch (error) {
        console.error(`Error fetching ${documentType}:`, error);
      }
    };

    fetchIdProof();
  };

  return (
    <Layout title="Doctor Profile">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doctor Profile</h5>
                <div className="profile-pic-container">
                  <div className="profile-pic">
                    {doctorImageUrl ? (
                      <img src={doctorImageUrl} alt="DoctorImage" />
                    ) : (
                      <div className="no-image">No image available</div>
                    )}
                  </div>
                </div>
                <div className="document-buttons">
                  {/* View button for ID Proof */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => openDocumentProof(doctorId, "idProof")}
                  >
                    View ID Proof
                  </button>
                  {/* View button for License */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => openDocumentProof(doctorId, "licenseID")}
                  >
                    View License
                  </button>
                  {/* View button for Address Proof */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => openDocumentProof(doctorId, "addressID")}
                  >
                    View Address Proof
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Doctor Details section */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doctor Details</h5>
                <div className="details">
                  <p>
                    <strong>Name:</strong> {DoctorAuth.doctor.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {DoctorAuth.doctor.age}
                  </p>
                  <p>
                    <strong>Email:</strong> {DoctorAuth.doctor.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {DoctorAuth.doctor.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {DoctorAuth.doctor.location}
                  </p>
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {DoctorAuth.doctor.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {DoctorAuth.doctor.experience}
                  </p>
                  <p>
                    <strong>Gender:</strong> {DoctorAuth.doctor.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfile;
