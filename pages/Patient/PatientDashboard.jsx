import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import PatientDashboardMenu from "../../pages/Patient/PatientDashboardMenu";
import { usePatientAuth } from "../../context/Patientauth";
import axios from "axios";

const Dashboard = () => {
  const [PatientAuth] = usePatientAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patients"); // Change the URL to match your API endpoint
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Layout title={"Dashboard - CureConnect"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <PatientDashboardMenu />
          </div>
          {/*<div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
              <h3>Patients:</h3>
              <ul>
                {patients.map((patient) => (
                  <li key={patient.id}>
                    {patient.name} - {patient.age} years old
                  </li>
                ))}
              </ul>
            </div>
                </div>*/}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
