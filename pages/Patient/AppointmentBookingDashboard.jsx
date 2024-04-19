import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom"; // Import useHistory hook
import Layout from "../../components/Layout/Layout";
import "../../styles/AppointmentBookingDashboard.css"; // Import CSS file

function AppointmentDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  //const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    axios
      .get("https://your-api-url/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const scheduleAppointment = (doctorName) => {
    console.log("Redirecting to " + doctorName + "'s profile page...");
    // Redirect to the doctor's profile page
    //history.push(`/doctors/${doctorName}`); // Assuming doctorName is a unique identifier
  };

  return (
    <Layout>
      <div className="appointment-dashboard">
        <div className="filter-section">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" />
          {/* Add more filter options as needed */}
        </div>
        <div className="search-bar">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search doctors..."
            onChange={handleSearch}
          />
        </div>
        <div className="results">
          {doctors.map(
            (doctor) =>
              doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <div className="card" key={doctor.id}>
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="doctor-photo"
                  />
                  <h3>{doctor.name}</h3>
                  <p>{doctor.gender}</p>
                  <p>{doctor.specialty}</p>
                  <p>{doctor.address}</p>
                  <button onClick={() => scheduleAppointment(doctor.name)}>
                    Schedule Appointment
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AppointmentDashboard;
