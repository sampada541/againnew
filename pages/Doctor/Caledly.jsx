import React, { useEffect } from "react";

const Calendly = () => {
  const calendlyUrl = "https://calendly.com/raj788257/doctor-1";
  return (
    <div>
      <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ color: "white" }}>Schedule Appointment</button>
      </a>
    </div>
  );
};

export default Calendly;
