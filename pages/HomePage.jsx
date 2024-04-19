import React from "react";
import Layout from "../components/Layout/Layout";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col>
            <h1 className="text-center" style={{ color: "#007bff" }}>
              Welcome To CureConnect!
            </h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-fluid"
                  src="/images/back1.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 img-fluid"
                  src="/images/back2.png"
                  alt="Second slide"
                />
              </Carousel.Item>
              {/* Add more Carousel.Item for additional images */}
            </Carousel>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="text-center">
              Explore our Centres of Clinical Excellence
            </h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={6} md={12}>
            <img
              src="/images/back3.jpg"
              alt="Clinical Excellence"
              className="img-fluid"
              style={{ borderRadius: "20px" }}
            />
          </Col>
          <Col lg={6} md={12} className="mt-md-0 mt-3">
            <Row>
              <Col xs={6} className="mb-3">
                <Card className="hover-card">
                  <Card.Body>
                    <Card.Title>Gynecologist</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} className="mb-3">
                <Card className="hover-card">
                  <Card.Body>
                    <Card.Title>Physician</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} className="mb-3">
                <Card className="hover-card">
                  <Card.Body>
                    <Card.Title>Psychiatrist</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} className="mb-3">
                <Card className="hover-card">
                  <Card.Body>
                    <Card.Title>Dermatologist</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} className="mb-3">
                <Card className="hover-card">
                  <Card.Body>
                    <Card.Title>Cardiologist</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              {/* Add more Col components for additional cards */}
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <div className="border border-dark p-3">
              <h3 className="text-center">Reasons to Choose CureConnect</h3>
              <p>
                CureConnect, an innovative healthcare platform, endeavors to
                revolutionize the medical landscape by leveraging advanced
                technologies. Its primary objective is to provide precise
                disease predictions, utilizing cutting-edge algorithms and
                comprehensive data analysis. By harnessing the power of
                artificial intelligence and machine learning, CureConnect aims
                to offer tailored doctor recommendations, ensuring that patients
                receive personalized care that aligns with their unique medical
                needs and preferences. Moreover, CureConnect simplifies the
                process of scheduling appointments through its user-friendly
                interface, facilitating seamless access to healthcare services.
                By streamlining appointment booking procedures, CureConnect aims
                to eliminate barriers to healthcare access, making it easier for
                individuals to seek timely medical assistance when needed. This
                streamlined approach not only enhances convenience for patients
                but also optimizes efficiency within healthcare systems,
                ultimately leading to improved patient outcomes and overall
                healthcare quality.
              </p>
            </div>
          </Col>
          <Col md={6} className="mt-md-0 mt-3">
            <img
              src="/images/back4.jpg"
              alt="Reasons"
              className="img-fluid"
              style={{ borderRadius: "20px" }}
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="text-center">What Is New Today?</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} className="mb-4">
            <div className="card h-100">
              <img
                src="/images/news1.png"
                className="card-img-top img-fluid"
                alt="News 1"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "700" }}>
                  Revolutionizing Healthcare: Introducing CureConnect App for
                  Seamless Patient Care
                </h5>
                <p className="card-text">
                  In a groundbreaking move, the highly anticipated CureConnect
                  App is set to launch, promising to transform the healthcare
                  landscape. This innovative platform aims to streamline
                  patient-doctor interactions, providing a seamless experience
                  for all involved. Stay tuned for the unveiling of this
                  game-changing app!
                </p>
                <NavLink
                  to="/news1"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#41886c",
                    color: "white",
                    border: "1px solid #41886c",
                  }}
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="card h-100">
              <img
                src="/images/news2.jpg"
                className="card-img-top img-fluid"
                alt="News 2"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "700" }}>
                  Expanding Horizons: More Doctors Joining CureConnect to
                  Enhance Patient Care
                </h5>
                <p className="card-text">
                  CureConnect announces the integration of additional doctors
                  into its platform, enhancing accessibility and diversity in
                  healthcare services. With more experts on board, patients can
                  expect even greater convenience and specialized care. Explore
                  the upcoming features and stay ahead in your healthcare
                  journey!
                </p>
                <NavLink
                  to="/news2"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#41886c",
                    color: "white",
                    border: "1px solid #41886c",
                  }}
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="card h-100">
              <img
                src="/images/news3.jpg"
                className="card-img-top img-fluid"
                alt="News 3"
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "700" }}>
                  Celebrating Success: Happy Customers Share Their CureConnect
                  Experience
                </h5>
                <p className="card-text">
                  Amidst the buzz of innovation, CureConnect celebrates a string
                  of satisfied customers, sharing their positive experiences
                  with the platform. From streamlined appointments to
                  personalized care, users express delight in the seamless
                  healthcare journey facilitated by CureConnect. Join the ranks
                  of happy customers and discover the future of healthcare
                  convenience today!
                </p>
                <NavLink
                  to="/news3"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#41886c",
                    color: "white",
                    border: "1px solid #41886c",
                  }}
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 className="text-center">What Would You Like To Do Today?</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "600" }}>
                  Predict Disease
                </h5>
                <p className="card-text">
                  Feeling Uncertain About Your Health? Let Symptoms Speak:
                  Predicting Diseases with Precision. Say goodbye to uncertainty
                  as advanced algorithms decode your symptoms, unveiling
                  potential health concerns before they escalate. Embrace
                  proactive healthcare with symptom-based prediction, guiding
                  you towards timely interventions and peace of mind on your
                  health journey
                </p>
                <NavLink
                  to="/dashboard/predict-disease"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#41886c",
                    color: "white",
                    border: "1px solid #41886c",
                  }}
                >
                  Predict Here!
                </NavLink>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "600" }}>
                  Schedule Appointment
                </h5>
                <p className="card-text">
                  Effortless Health Connections: Coming Soon - Find Your Doctor,
                  Book Appointments with Ease. Seamlessly browse, select, and
                  schedule appointments, all on a user-friendly platform.
                  Whether it's a routine check-up or specialized care, quality
                  healthcare is just a click away. Stay tuned as we bring you
                  hassle-free access to a world of medical expertise, right at
                  your fingertips.
                </p>
                <NavLink
                  to="/schedule"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#41886c",
                    color: "white",
                    border: "1px solid #41886c",
                  }}
                >
                  Schedule Now!
                </NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default HomePage;
