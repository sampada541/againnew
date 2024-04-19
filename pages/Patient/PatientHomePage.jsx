import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import "../../styles/PatientHomePage.css";

const PatientHomePage = () => {
  const [historyAppointments, setHistoryAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch history appointments
        const historyResponse = await axios.get(
          "/api/v1/patient/history-appointments"
        );
        setHistoryAppointments(historyResponse.data.appointments || []);

        // Fetch upcoming appointments
        const upcomingResponse = await axios.get(
          "/api/v1/patient/upcoming-appointments"
        );
        setUpcomingAppointments(upcomingResponse.data.appointments || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Layout title="Patient Home">
      <div className="patient-home-page-container">
        {/* Left section */}
        <div className="patient-home-page-left-section">
          <h2>History of Appointments</h2>
          <ul>
            {historyAppointments.map((appointment) => (
              <li key={appointment.id}>
                {appointment.date} - {appointment.reason}
              </li>
            ))}
          </ul>
        </div>
        {/* Empty space */}
        <div className="patient-home-page-empty-space"></div>
        {/* Right section */}
        <div className="patient-home-page-right-section">
          {/* Upcoming appointments */}
          <div className="patient-home-page-upcoming-appointments">
            <h2>Upcoming Appointments</h2>
            <ul>
              {upcomingAppointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.date} - {appointment.reason}
                </li>
              ))}
            </ul>
          </div>
          {/* Offer section */}
          <div className="patient-home-page-offer-section">
            <img
              src="/images/offer1.png"
              alt="Offer Image"
              className="img-fluid"
            />
            {/* Insert code to display offer prices */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientHomePage;
