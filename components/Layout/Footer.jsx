import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row gx-5">
          <div className="col-md-4">
            <p
              className="small link-danger pt-2 pb-0 mb-0 ftcol"
              style={{ textAlign: "left" }}
            >
              Get A Lot Of Information About Us
            </p>

            <h4 className="dp-col4 fs-5 mb-3">Subscribe Our Newsletter</h4>
            <div className="mb-3">
              <div className="response-n"></div>
              <p></p>
            </div>
            <form id="form-subscribe-news-letter">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="email"
                  placeholder="Enter your email id"
                />
              </div>
              <p>
                <button
                  type="submit"
                  className="btn btn-primary w-100 ft-btn"
                  id="btn-subscribe-newsletter"
                >
                  Submit
                </button>
              </p>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-between">
            <div className="d-flex flex-column">
              <h5>About</h5>
              <ul className="list-unstyled ft-links">
                <li>
                  <a>About Us</a>
                </li>
                <li>
                  <a>Contact Us</a>
                </li>
                <li>
                  <a>Careers</a>
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column">
              <h5>User Policy</h5>
              <ul className="list-unstyled ft-links">
                <li>Terms of Use</li>
              </ul>
            </div>
            <div className="d-flex flex-column">
              <h5>Help</h5>
              <ul className="list-unstyled ft-links">
                <li>FAQ</li>
                <li>Report Infringement</li>
              </ul>
            </div>
            <div className="d-flex flex-column">
              <h5>Social</h5>
              <ul className="list-unstyled ft-links">
                <li>
                  <a>FaceBook</a>
                </li>
                <li>
                  <a>Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 CureConnect App. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
