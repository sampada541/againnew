import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import "../../styles/AppointmentBookingDashboard.css"; // Import CSS file
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePatientAuth } from "../../context/Patientauth";

function convertToIST(dateTimeString) {
  const utcDateTime = new Date(dateTimeString);
  const istDateTime = new Date(
    utcDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return istDateTime.toLocaleString();
}

function AppointmentDashboard() {
  const [PatientAuth, setPatientAuth] = usePatientAuth();
  const patientId = PatientAuth?.patient?._id;
  const location = useLocation();
  const doctorId = new URLSearchParams(location.search).get("id");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Check if doctorId is available
    if (!doctorId) {
      toast.error("Doctor ID not provided");
      return;
    }

    axios
      .get(`/api/v1/fetch/fetchSlots/${doctorId}`)
      .then((response) => {
        const { appointments } = response.data;
        setAppointments(appointments);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
        toast.error("Error fetching doctor data");
      });
  }, [doctorId]); // Include doctorId in dependency array

  const bookAppointment = async (appointmentId, patientId) => {
    try {
      // Validate required fields
      if (!appointmentId || !patientId) {
        toast.error("Please provide appointmentId and patientId");
        return;
      }

      // Make API call to book appointment
      const response = await axios.post("/api/v1/fetch/bookAppointment", {
        appointmentId,
        patientId,
      });

      // Check if booking was successful
      if (response.data.success) {
        toast.success(response.data.message);
        // Reload the page to reflect the changes after booking
        window.location.reload();
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment");
    }
  };

  return (
    <Layout title="Search Results">
      <div>
        <h4>Doctor Details</h4>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date Time (IST)</th>
                <th>End Date Time (IST)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="3">No slots found</td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{convertToIST(appointment.dateTime)}</td>
                    <td>{convertToIST(appointment.endDateTime)}</td>
                    <td>
                      {/* Button to book appointment */}
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() =>
                          bookAppointment(appointment._id, patientId)
                        }
                      >
                        Book
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
}

export default AppointmentDashboard;
