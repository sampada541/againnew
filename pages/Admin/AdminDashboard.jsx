import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AdminDashboard.css";
import fetchDoctorDocuments from "../Doctor/fetchDoctorDocuments";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors' details when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Function to fetch doctors' details from the backend
  const fetchDoctors = async () => {
    try {
      // API call to fetch doctors' details
      const res = await axios.get("/api/v1/fetch/getdocDetails");
      if (res && res.data.success) {
        setDoctors(res.data.doctors); // Set fetched doctor details to state
      } else {
        toast.info(res.data.message); // Display error message if fetching fails
      }
    } catch (error) {
      toast.error(error); // Display error message if an error occurs during fetching
    }
  };

  // Function to handle verification or rejection of doctor registration
  const handleVerify = async (doctorId, shouldReject) => {
    try {
      // API call to verify or reject doctor registration
      const res = await axios.post(`/api/v1/fetch/sendVM/${doctorId}`, {
        shouldReject,
      });
      if (res && res.data.success) {
        if (shouldReject) {
          toast.error("Doctor registration rejected"); // Display message if registration is rejected
        } else {
          toast.success(res.data.message); // Display message if registration is verified
          fetchDoctors(); // Fetch updated doctor details after verification or rejection
        }
      } else {
        toast.error(res.data.message); // Display error message if verification or rejection fails
      }
    } catch (error) {
      toast.error(error); // Display error message if an error occurs during verification or rejection
    }
  };

  // Function to send a warning email to a doctor for incorrect details
  const handleSendWarningEmail = async (doctorId, doctorEmail) => {
    try {
      // API call to send a warning email to a doctor
      const res = await axios.post(
        `/api/v1/fetch/sendWM/${doctorId}` // Fetching doctor ID from the parameter
      );
      if (res && res.data.success) {
        toast.info(res.data.message); // Display message when warning email is successfully sent
      } else {
        toast.error(res.data.message || "Failed to send warning email"); // Display error message if sending warning email fails
      }
    } catch (error) {
      toast.error("Failed to connect to the server. Please try again later."); // Display error message if an error occurs during sending warning email
    }
  };

  // Function to open document proof in a new tab
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
    <Layout title="Admin Dashboard">
      <div>
        <h4>Doctor Details</h4>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Location</th>
                <th>Experience</th>
                <th>Specialization</th>
                <th>Profile Picture</th>
                <th>ID Proof</th>
                <th>License</th>
                <th>Address Proof</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.gender}</td>
                  <td>{doctor.location}</td>
                  <td>{doctor.experience}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    {/* View button for profile picture */}
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "photo")}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    {/* View button for ID Proof */}
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "idProof")}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    {/* View button for License */}
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "licenseID")}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    {/* View button for Address Proof */}
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "addressID")}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    {!doctor.isVerified && (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleVerify(doctor._id, false)}
                        >
                          Verify
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            handleSendWarningEmail(doctor._id, doctor.email)
                          }
                        >
                          Send Warning
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleVerify(doctor._id, true)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
