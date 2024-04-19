import { useState, useEffect } from "react";
import { useDoctorAuth } from "../../context/docauth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [DoctorAuth, setDcotorAuth] = useDoctorAuth();

  useEffect(() => {
    const DoctorAuthCheck = async () => {
      const res = await axios.get("/api/v1/auth/doctor-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (DoctorAuth?.token) DoctorAuthCheck();
  }, [DoctorAuth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
