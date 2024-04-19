import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PatientAuthProvider } from "./context/Patientauth";
import { DoctorAuthProvider } from "./context/docauth";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";

ReactDOM.render(
  <PatientAuthProvider>
    <DoctorAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </DoctorAuthProvider>
  </PatientAuthProvider>,
  document.getElementById("root")
);
reportWebVitals();

