import React from "react";

const DoctorVerificationEmail = () => {
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
          backgroundColor: "#4CAF50",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* Add your downloaded icon image here */}
        <img
          src="/images/email2.png"
          alt="Success Icon"
          style={{ width: "60px", borderRadius: "50%", marginBottom: "20px" }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Congratulations!</h2>
        <p>
          Welcome to CureConnect. Your registration has been successfully
          completed and all your documents have been verified.
        </p>
        <p>You are now officially a verified doctor with CureConnect!</p>
        {/* Introduction */}
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <p>
            To make the consultation process easier, we have taken a few steps
            to streamline your experience. Please complete the following
            necessary steps before proceeding:
          </p>
        </div>
        {/* Step-by-step instructions */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Next Steps:</h3>
          <ol style={{ textAlign: "left", paddingInlineStart: "0" }}>
            <li
              style={{
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
                listStyleType: "none",
              }}
            >
              <strong>Step 1:</strong> Go to the Cadely website:
              <a
                href="https://calendly.com/"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {" "}
                https://calendly.com/
              </a>
            </li>
            <li
              style={{
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
                listStyleType: "none",
              }}
            >
              <strong>Step 2:</strong> Create an account and log in.
            </li>
            <li
              style={{
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
                listStyleType: "none",
              }}
            >
              <strong>Step 3:</strong> Click on "My Account" and you will be
              redirected to the event pages.
            </li>
            <li
              style={{
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
                listStyleType: "none",
              }}
            >
              <strong>Step 4:</strong> Copy the link from the 30-minute "one to
              one" event.
            </li>
            <li
              style={{
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
                listStyleType: "none",
              }}
            >
              <strong>Step 5:</strong> Upload the copied link from Cadely here
              or below provided button:
              <a
                href="https://github.com/sampada541/sdfsdf"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                https://github.com/sampada541/sdfsdf
              </a>
            </li>
          </ol>
          <p style={{ fontFamily: "Arial, sans-serif" }}>
            It is necessary for doctors to complete these steps before
            proceeding to login.
          </p>
        </div>
        <p>Please proceed to upload the link created by you here:</p>
        <a
          href="/doctor-login"
          style={{
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "16px",
            padding: "12px 24px",
            borderRadius: "5px",
            marginTop: "20px",
            display: "inline-block",
          }}
        >
          Link Upload
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

export default DoctorVerificationEmail;
