import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDoctorAuth } from "../../context/docauth";
import fetchDoctorDocuments from "./fetchDoctorDocuments";
import "../../styles/DoctorProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorProfile = () => {
  const [DoctorAuth] = useDoctorAuth(); // Destructuring DoctorAuth from context directly
  const doctorId = DoctorAuth.doctor._id;
  const [doctorImageUrl, setDoctorImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchDoctorDocuments(doctorId, "photo");
      if (imageUrl) {
        setDoctorImageUrl(imageUrl);
      }
    };
    fetchImage();
  }, [doctorId]);

  return (
    <Layout title="Doctor Profile">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doctor Profile</h5>
                <div className="profile-pic-container">
                  <div className="profile-pic">
                    {doctorImageUrl ? (
                      <img src={doctorImageUrl} alt="DoctorImage" />
                    ) : (
                      <div className="no-image">No image available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Doctor Details</h5>
                <div className="details">
                  <p>
                    <strong>Name:</strong> {DoctorAuth.doctor.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {DoctorAuth.doctor.age}
                  </p>
                  <p>
                    <strong>Email:</strong> {DoctorAuth.doctor.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {DoctorAuth.doctor.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {DoctorAuth.doctor.location}
                  </p>
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {DoctorAuth.doctor.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {DoctorAuth.doctor.experience}
                  </p>
                  <p>
                    <strong>Gender:</strong> {DoctorAuth.doctor.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfile;
