import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AdminDashboard.css";
import fetchDoctorDocuments from "../Doctor/fetchDoctorDocuments";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const specialization = new URLSearchParams(location.search).get("q");

  // Function to fetch doctors' details from the backend
  const fetchDoctors = async () => {
    try {
      // API call to fetch doctors' details
      const res = await axios.get(
        `/api/v1/fetch/searchQuery/${specialization}`
      );
      if (res && res.data.success) {
        setDoctors(res.data.doctors); // Set fetched doctor details to state
      } else {
        setDoctors([]); // Clear doctors array if fetching fails
        toast.info(res.data.message); // Display error message if fetching fails
      }
    } catch (error) {
      setDoctors([]); // Clear doctors array if an error occurs during fetching
      toast.error("Please Enter Specialization From The Given Option"); // Display error message if an error occurs during fetching
    }
  };

  // Fetch doctors' details when the component mounts and when the URL changes
  useEffect(() => {
    fetchDoctors();
  }, [location]);

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
    <Layout title="Search Results">
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
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="10">No doctors found for {specialization}</td>
                </tr>
              ) : (
                doctors.map((doctor) => (
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
                        onClick={() =>
                          openDocumentProof(doctor._id, "licenseID")
                        }
                      >
                        View
                      </button>
                    </td>
                    <td>
                      {/* View button for Address Proof */}
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() =>
                          openDocumentProof(doctor._id, "addressID")
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
