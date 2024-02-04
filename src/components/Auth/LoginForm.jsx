import { useState, useEffect } from "react";
import axios from "axios";
import LoginMessage from "./LoginMessage";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation
    if (!formData.password.trim() || !formData.email.trim()) {
      setValidationError("All fields are required");
      setShowValidationError(true);
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setValidationError("Invalid email address");
      setShowValidationError(true);
      return;
    }

    try {
      const response = await axios.post("https://js2-ecommerce-api.vercel.app/api/auth/login", formData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsSubmitted(true);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
        <LoginMessage isSuccess={isLoggedIn} />
      ) : (
        <>
          {!isLoggedIn && <p className="fs-5 mt-5">Enter a valid email and password to login.</p>}
          <form onSubmit={handleSubmit}>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required />
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
          {showValidationError && <p>{validationError}</p>}
        </>
      )}
    </div>
  );
};

export default LoginForm;
