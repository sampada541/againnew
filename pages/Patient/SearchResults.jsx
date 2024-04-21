import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/SearchResults.css";
import fetchDoctorDocuments from "../Doctor/fetchDoctorDocuments";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

const SearchResults = () => {
  const navigate = useNavigate();
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
        toast.error(error);
      }
    };

    fetchIdProof();
  };

  const handleSubmit = (doctorId) => {
    navigate(
      `/dashboard/appointment-dashboard?id=${encodeURIComponent(doctorId)}`
    );
  };

  return (
    <Layout title="Search Results">
      <div className="search-results-container">
        <Carousel>
          {doctors.map((doctor, index) => (
            <Carousel.Item key={index}>
              <Card className="doctor-card">
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Text>
                    <p>
                      <strong>Specialization:</strong> {doctor.specialization}
                    </p>
                    <p>
                      <strong>Location:</strong> {doctor.location}
                    </p>
                    <p>
                      <strong>Gender:</strong> {doctor.gender}
                    </p>
                    <p>
                      <strong>Phone:</strong> {doctor.phone}
                    </p>
                  </Card.Text>
                  <div className="search-results-btn-container">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "idProof")}
                    >
                      View ID
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "licenseID")}
                    >
                      View License
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => openDocumentProof(doctor._id, "addressID")}
                    >
                      View Address
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleSubmit(doctor._id)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Layout>
  );
};

export default SearchResults;
