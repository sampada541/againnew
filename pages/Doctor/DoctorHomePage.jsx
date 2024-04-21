import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useDoctorAuth } from "../../context/docauth";
import { toast } from "react-toastify";

const DoctorHomePage = () => {
  const [DoctorAuth, setDoctorAuth] = useDoctorAuth();
  const [appointments, setAppointments] = useState([]);
  const doctorId = DoctorAuth?.doctor?._id;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `/api/v1/fetch/booked/doctorAppointment/${doctorId}`
      );

      if (res.data.success) {
        setAppointments(res.data.appointments);
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching appointments.");
      console.error("Error fetching appointments:", error);
    }
  };

  function convertToIST(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);
    const istDateTime = new Date(
      utcDateTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    return istDateTime.toLocaleString();
  }

  return (
    <Layout title="Doctor Homepage">
      <div className="admin-dashboard-container">
        <h2>Doctor Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Start Date and Time</th>
              <th>End Date and Time</th>
              <th>Patient Name</th>
              <th>Patient Gender</th>
              <th>Patient Age</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="7">No appointments found</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{convertToIST(appointment.dateTime)}</td>
                  <td>{convertToIST(appointment.endDateTime)}</td>
                  <td>{appointment.patient.name}</td>
                  <td>{appointment.patient.gender}</td>
                  <td>{appointment.patient.age}</td>
                  <td>{appointment.patient.location}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DoctorHomePage;
