import React from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <Layout title="About Us">
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <div className="about-heading mb-4">
              <h2>About Us</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="order-md-2">
            <div className="about-image">
              <img src="path_to_image" alt="About Us" className="img-fluid" />
            </div>
          </Col>

          <Col md={6} className="order-md-1">
            <div className="about-text">
              <p>
                Welcome to CureConnect, where innovation meets compassion in the
                realm of healthcare. At CureConnect, we are dedicated to
                transforming the way individuals access and manage their health,
                making it tailored, effective, and user-friendly. Through
                cutting-edge technology and a commitment to personalized care,
                we strive to revolutionize healthcare delivery for the
                betterment of all.
              </p>
              <p>
                Imagine having a personal health assistant at your fingertips,
                ready to guide you through any health-related concerns with
                precision and ease. CureConnect is that virtual companion,
                designed to navigate the complexities of the healthcare
                landscape alongside you. Leveraging the power of data analytics
                and artificial intelligence, CureConnect empowers users to take
                preemptive measures and efficiently manage their health.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <div className="about-image">
              <img src="path_to_image" alt="About Us" className="img-fluid" />
            </div>
          </Col>
          <Col md={6}>
            <div className="about-text">
              <p>
                At the heart of CureConnect lies its ability to swiftly analyze
                symptoms reported by users, providing insights into potential
                illnesses and recommending appropriate courses of action. This
                predictive capability not only alleviates anxiety but also
                enables timely interventions, potentially halting the
                progression of ailments. Moreover, CureConnect goes beyond
                diagnostics, connecting users with qualified healthcare
                providers based on their individual needs and preferences,
                fostering stronger patient-provider relationships and improving
                overall outcomes.
              </p>
              <p>
                In a world where technology continues to shape our daily lives,
                the significance of platforms like CureConnect cannot be
                overstated. As we explore the genesis, functionality, and
                potential impact of CureConnect on healthcare accessibility and
                efficiency, we illuminate its role as a catalyst for positive
                change in personalized medicine. Through rigorous analysis and
                empirical evidence, we aim to showcase the transformative
                potential of CureConnect in shaping the future of healthcare
                delivery.
              </p>
              <p>
                Join us on this journey as we harness the power of technology to
                usher in a new era of healthcare—one that is accessible,
                efficient, and truly patient-centered. Together, we can make a
                difference in the lives of individuals and communities
                worldwide, ensuring that everyone has access to the care they
                deserve. Welcome to CureConnect, where healthcare meets
                humanity.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <div className="join-us">
              <h3>Join Us</h3>
              <p>
                Together, we can make a difference in the lives of individuals
                and communities worldwide. Join CureConnect today!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutUs;
