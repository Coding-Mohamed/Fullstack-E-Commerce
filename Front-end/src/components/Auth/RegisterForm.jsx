import { useState, useEffect } from "react";
import axios from "axios";
import RegisterMessage from "./RegisterMessage";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showValidationError, setShowValidationError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    //  validation
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(email.trim())) {
      return false;
    }

    const [, domain] = email.split("@");

    const popularDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "mail.com", "zoho.com", "protonmail.com", "live.com"];

    if (!popularDomains.includes(domain.toLowerCase())) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (showValidationError) {
      const timeout = setTimeout(() => {
        setShowValidationError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showValidationError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  validation
    if (!formData.password.trim() || !formData.email.trim() || !formData.passwordConfirm.trim()) {
      setValidationError("All fields are required");
      setShowValidationError(true);
      return;
    }
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      setShowValidationError(true);
      return;
    }

    // Email validation
    if (!isValidEmail(formData.email)) {
      setValidationError("Invalid email address or unsupported domain");
      setShowValidationError(true);
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setValidationError("Passwords do not match");
      setShowValidationError(true);
      return;
    }

    // form submission
    try {
      await axios.post("https://js2-ecommerce-api.vercel.app/api/auth/register", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data && error.response.data.message === "Email already exists") {
        setValidationError("An error occurred while registering");
      } else {
        setValidationError(" Email is already registered");
      }
      setShowValidationError(true);
    }
  };

  return (
    <div className="container">
      {isSubmitted ? (
        <RegisterMessage isSuccess={true} />
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-7">
            <p className="my-4 text-dark fs-5 ">Unlock access with a valid email and a strong password. Join us now!</p>
            <form onSubmit={handleSubmit} className="g-3 bg-light p-4 rounded">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your password" />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirm Password:
                </label>
                <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="Confirm Password" />
              </div>
              {showValidationError && (
                <div className="alert alert-danger" role="alert">
                  {validationError}
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
