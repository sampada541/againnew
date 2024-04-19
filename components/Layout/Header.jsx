import React from "react";
import { NavLink, Link } from "react-router-dom";
import SearchInput from "../Form/SearchInput";
import { usePatientAuth } from "../../context/Patientauth";
import { useDoctorAuth } from "../../context/docauth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/header.css";

const Header = () => {
  const [patientAuth, setPatientAuth] = usePatientAuth();
  const [doctorAuth, setDoctorAuth] = useDoctorAuth();

  // Function to handle logout
  const handlePLogout = () => {
    setPatientAuth({
      patient: null,
      token: "",
    });
    localStorage.removeItem("PatientAuth");
    toast.success("Logout Successfully");
  };

  const handleDLogout = () => {
    setDoctorAuth({
      doctor: null,
      token: "",
    });
    localStorage.removeItem("DoctorAuth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={"/"} className="navbar-brand" style={{ color: "white" }}>
              ⚕ CureConnect
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {patientAuth.patient ? (
                <>
                  <SearchInput />
                  <li className="nav-item">
                    <NavLink to="/dashboard/patient-home" className="nav-link">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard/predict-disease"
                      className="nav-link"
                    >
                      Predict Disease
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={`/dashboard/patient-profile`}
                      className="nav-link"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={handlePLogout}
                      to="/"
                      className="nav-link"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : doctorAuth.doctor ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/dashboard/doctor-home"} className="nav-link">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/dashboard/doctor-profile"
                      className="nav-link"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      onClick={handleDLogout}
                      to="/"
                      className="nav-link"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      Register
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <NavLink
                          to="/patient-register"
                          className="dropdown-item"
                        >
                          Register as Patient
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/doctor-register"
                          className="dropdown-item"
                        >
                          Register as Doctor
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      Login
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <NavLink to="/patient-login" className="dropdown-item">
                          Login as Patient
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/doctor-login" className="dropdown-item">
                          Login as Doctor
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
