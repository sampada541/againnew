import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import "../../styles/AppointmentBookingDashboard.css"; // Import CSS file
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppointmentDashboard() {
  const location = useLocation();
  const doctorId = new URLSearchParams(location.search).get("id");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/fetch/fetchSlots/${doctorId}`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  }, []);
  toast.success(doctorId);
  console.log(doctorId);

  const bookAppointment = (appointmentId) => {
    console.log("Redirecting to " + appointmentId + "'s profile page...");
    // Redirect to the doctor's profile page
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
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="10">No slot found</td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.dateTime}</td>
                    <td>{appointment.endDateTime}</td>

                    <td>
                      {/* View button for profile picture */}
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => bookAppointment(appointment._id)}
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
