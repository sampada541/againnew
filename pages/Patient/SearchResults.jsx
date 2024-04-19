import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import fetchDoctorDocuments from "../Doctor/fetchDoctorDocuments";
import "../../styles/AdminDashboard.css";

const DoctorsList = ({ doctors, openDocumentProof }) => {
  return (
    <Layout title="Search Results">
      <div className="Search-result-page-cards">
        {doctors.map((doctor) => (
          <div className="Search-result-page-card" key={doctor._id}>
            <div className="Search-doctor-details">
              <h4>Doctor Details</h4>
              <div className="Search-card-content">
                <div>
                  <strong>Name:</strong> {doctor.name}
                </div>
                <div>
                  <strong>Phone:</strong> {doctor.phone}
                </div>
                <div>
                  <strong>Gender:</strong> {doctor.gender}
                </div>
                <div>
                  <strong>Location:</strong> {doctor.location}
                </div>
                <div>
                  <strong>Experience:</strong> {doctor.experience}
                </div>
                <div>
                  <strong>Specialization:</strong> {doctor.specialization}
                </div>
              </div>
            </div>
            <div className="card-buttons">
              <button
                className="btn btn-info btn-sm"
                onClick={() => openDocumentProof(doctor._id, "idProof")}
              >
                ID Proof
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={() => openDocumentProof(doctor._id, "licenseID")}
              >
                License
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={() => openDocumentProof(doctor._id, "addressID")}
              >
                Address Proof
              </button>
              <a
                href={doctor.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary btn-sm">Schedule</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const specialization = searchParams.get("q");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (!specialization) {
      toast.error("Please enter a specialization to search.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      // Navigate to the homepage
      return;
    }

    fetchDoctors(); // Call the fetchDoctors function
  }, [specialization]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        `/api/v1/fetch/searchQuery/${specialization}`
      );
      if (res && res.data.success) {
        setDoctors(res.data.doctors);
      } else {
        toast.error(res.data.message); // Display info notification
      }
    } catch (error) {
      toast.error(error.message); // Display error notification
    }
  };

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

  // Display toast notification if no doctors are found for the searched specialization
  if (doctors.length === 0 || !doctors) {
    toast.error("No doctors found for the searched specialization.");
  }
  return (
    <DoctorsList doctors={doctors} openDocumentProof={openDocumentProof} />
  );
};

export default SearchResults;
