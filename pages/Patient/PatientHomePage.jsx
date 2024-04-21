import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import "../../styles/PatientHomePage.css";
import { toast } from "react-toastify";
import { usePatientAuth } from "../../context/Patientauth";

const PatientHomePage = () => {
  const [PatientAuth, setPatientAuth] = usePatientAuth();
  const [allAppointments, setAllAppointments] = useState([]);
  const patientId = PatientAuth?.patient?._id;

  function convertToIST(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);
    const istDateTime = new Date(
      utcDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    return istDateTime.toLocaleString();
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/api/v1/fetch/booked/appointment/${patientId}`
        );
        console.log(response);
        // Assuming the response contains an array of appointments with fields: id, date, reason
        setAllAppointments(response.data.appointments);
      } catch (error) {
        toast.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Separate appointments into history and upcoming based on date
  const historyAppointments = allAppointments.filter((appointment) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.dateTime);
    return appointmentDate < currentDate;
  });

  const upcomingAppointments = allAppointments.filter((appointment) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.dateTime);
    return appointmentDate >= currentDate;
  });

  return (
    <Layout title="Patient Home">
      <div className="patient-home-page-container">
        {/* Left section */}
        <div className="patient-home-page-left-section">
          <h2>History of Appointments</h2>
          <ul>
            {historyAppointments.map((appointment) => (
              <li key={appointment.id}>{convertToIST(appointment.dateTime)}</li>
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
                  {convertToIST(appointment.dateTime)}
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
