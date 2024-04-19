import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useDoctorAuth } from "../../context/docauth";
import "../../styles/DoctorHomePage.css";

const DoctorHomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // Fetch appointments data from the server when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/v1/doctor/appointments"); // Fetch appointments data for the doctor from the backend server

      if (response && response.data && response.data.appointments) {
        setAppointments(response.data.appointments);
        setFetchError(false); // Reset fetch error state if data is fetched successfully
      } else {
        setFetchError(true);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setFetchError(true);
    }
  };

  const handleMarkAttendance = async (id, status) => {
    try {
      // Send a request to update the attendance status
      const response = await axios.put(`/api/v1/doctor/appointments/${id}`, {
        attended: status,
      });

      if (response && response.data && response.data.success) {
        // Update the attendance status locally if the request was successful
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, attended: status }
              : appointment
          )
        );
      } else {
        console.error("Failed to update attendance status");
      }
    } catch (error) {
      console.error("Error updating attendance status:", error);
    }
  };

  return (
    <Layout title="Doctor Homepage">
      <div className="appointment-container">
        <h2 className="title">Appointment List</h2>
        {fetchError ? (
          <p>Error fetching appointments. Please try again later.</p>
        ) : (
          <table className="appointment-table">
            <thead>
              <tr>
                <th className="table-heading">Si. No.</th>
                <th className="table-heading">Patient Name</th>
                <th className="table-heading">Appointment Time</th>
                <th className="table-heading">Remarks</th>
                <th className="table-heading">Status</th>
                <th className="table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.remarks}</td>
                  <td>{appointment.attended ? "Attended" : "Unattended"}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleMarkAttendance(
                          appointment.id,
                          !appointment.attended
                        )
                      }
                    >
                      {appointment.attended
                        ? "Mark Unattended"
                        : "Mark Attended"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default DoctorHomePage;
