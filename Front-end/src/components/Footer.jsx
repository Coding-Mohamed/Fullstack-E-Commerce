import { useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "./Auth/ ContactForm";
import AboutUsContent from "./Pages/AboutPage";

const Footer = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showAboutUsContent, setShowAboutUsContent] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubscriptionSuccess, setIsSubscriptionSuccess] = useState(false);

  const handleAboutClick = () => {
    setShowAboutUsContent(!showAboutUsContent);
    setShowContactForm(false);
  };

  const handleContactClick = () => {
    setShowContactForm(!showContactForm);
    setShowAboutUsContent(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };

  const handleSubscribeClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setIsEmailValid(false);
      setTimeout(() => {
        setIsEmailValid(true);
      }, 3000); // Clear error message after 20 seconds
      return;
    }

    // Set the success state to true
    setIsSubscriptionSuccess(true);

    // Clear the email input after successful subscription
    setEmail("");

    // Clear success message after 20 seconds
    setTimeout(() => {
      setIsSubscriptionSuccess(false);
    }, 20000);
  };

  return (
    <footer className="footer bg-dark text-white text-center p-3 d-flex flex-column justify-content-center align-items-center position-relative w-100">
      <div className="d-flex flex-wrap justify-content-around mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="d-flex">
          <Link to="#" onClick={handleAboutClick} className="text-link text-decoration-none me-4 fs-2 link-hover">
            About Us
          </Link>
          <Link to="#" onClick={handleContactClick} className="text-link text-decoration-none fs-2 link-hover">
            Contact
          </Link>
        </div>
        {showAboutUsContent && <AboutUsContent />}
        {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
        <div className="w-100 mt-3 text-center">
          <p className="fs-5 text-info">Subscribe to our newsletter and get 10% off</p>
          <div className="d-flex justify-content-center align-items-center">
            <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} className={`rounded-2 p-2 me-2 w-50 border-0 fs-5 mt-2 ${!isEmailValid ? "is-invalid" : ""}`} />
            <button className="btn btn-warning mt-2 fs-5 border-0 rounded-2 p-2" onClick={handleSubscribeClick}>
              Subscribe
            </button>
          </div>
          {!isEmailValid && <p className="text-danger mt-3">Invalid email address</p>}
          {isSubscriptionSuccess && <p className="text-success mt-3">Thanks for subscribing!</p>}
        </div>
        <div className="position-absolute bottom-0 mx-3 end-0 p-0 text-center">
          <p>&copy; 2024 Wholesale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
