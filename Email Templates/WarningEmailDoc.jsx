import React from "react";

const DoctorWarningEmail = () => {
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
          backgroundColor: "#FFC107",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* Add your downloaded icon image here */}
        <img
          src="/images/email3.png"
          alt="Warning Icon"
          style={{ width: "60px", borderRadius: "50%", marginBottom: "20px" }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Attention Required!</h2>
        <p>
          Please upload correct documents in order to complete your registration
          process.
        </p>
        <p>
          Failure to provide accurate documents may result in rejection of your
          registration.
        </p>
        <p>Click the button below to upload your documents:</p>
        <a
          href="/upload-docs"
          style={{
            backgroundColor: "#FF5722", // Red color
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "16px",
            padding: "12px 24px",
            borderRadius: "5px",
            marginTop: "20px",
            display: "inline-block",
          }}
        >
          Upload Documents
        </a>
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

export default DoctorWarningEmail;
