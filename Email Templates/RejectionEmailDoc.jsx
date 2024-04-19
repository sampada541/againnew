import React from "react";

const DoctorRejectionEmail = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#DC143C", // Red color
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* Add your downloaded icon image here */}
        <img
          src="/images/email4.jpg"
          alt="Rejection Icon"
          style={{ width: "60px", borderRadius: "50%", marginBottom: "20px" }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Registration Rejected</h2>
        <p>
          Due to failure to upload correct documents despite the warning, your
          registration has been rejected.
        </p>
        <p>
          If you wish to register with CureConnect, please ensure you provide
          proper documents and valid proofs.
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f4f4f4",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Copyright © 2024 CureConnectApp. All rights reserved.
      </div>
    </div>
  );
};

export default DoctorRejectionEmail;
