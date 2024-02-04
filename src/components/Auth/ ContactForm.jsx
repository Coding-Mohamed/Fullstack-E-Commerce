import { useState, useEffect } from "react";
import axios from "axios";
import FeedbackMessage from "../Pages/FeedbackMessage";
import "../style/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showValidationError, setShowValidationError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(email.trim())) {
      return false;
    }

    // Extract the domain
    const [, domain] = email.split("@");

    // Top 10 most popular email domains
    const popularDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "mail.com",
      "zoho.com",
      "protonmail.com",
      "live.com",
      // Add more popular domains as needed
    ];

    if (!popularDomains.includes(domain.toLowerCase())) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError("All fields are required");
      setShowValidationError(true);
      return;
    }

    // Email validation
    if (!isValidEmail(formData.email)) {
      setValidationError("Invalid email address or unsupported domain");
      setShowValidationError(true);
      return;
    }

    try {
      // Corrected URL for the messaging endpoint
      await axios.post("https://js2-ecommerce-api.vercel.app/api/messages", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setValidationError("An error occurred while submitting the form");
      setShowValidationError(true);
    }
  };

  useEffect(() => {
    if (showValidationError) {
      const timeout = setTimeout(() => {
        setShowValidationError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showValidationError]);

  return (
    <div className="contact-form">
      {isSubmitted ? (
        <FeedbackMessage isSuccess={true} />
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Full Name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" />
          </label>
          <label>
            Message:
            <textarea name="message" value={formData.message} onChange={handleChange} maxLength={1500}></textarea>
          </label>
          {showValidationError && <p className="error-message">{validationError}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
