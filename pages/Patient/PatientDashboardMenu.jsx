import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/PatientMenu.css";

const PatientDashboardMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group-left">
        <h4>Dashboard</h4>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Appointments
        </NavLink>
        <NavLink
          to="/patient/medicalhostory"
          className="list-group-item list-group-item-action"
        >
          Medical History
        </NavLink>
      </div>
    </div>
  );
};

export default PatientDashboardMenu;
