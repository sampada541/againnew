import { useState, useEffect } from "react";
import { usePatientAuth } from "../../context/Patientauth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PatientRoute() {
  const [ok, setOk] = useState(false);
  const [PatientAuth, setPatientAuth] = usePatientAuth();

  useEffect(() => {
    const PatientAuthCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (PatientAuth?.token) PatientAuthCheck();
  }, [PatientAuth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
