// src/pages/UserSignup.jsx
import React, { useState } from "react";
import { userSignup } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./UserSignup.css";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await userSignup(formData);
      alert(res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2 className="signup-title">Create your account</h2>
        <p className="signup-subtitle">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Sign in
          </Link>
        </p>
      </div>

      <div className="signup-form-container">
        <div className="signup-form">
          {error && (
            <div className="error-message">
              <div className="error-icon">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="error-text">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-space">
            <div className="name-fields">
              <div className="input-group">
                <label htmlFor="firstName" className="input-label">
                  First name
                </label>
                <div className="input-field">
                  <div className="input-icon">
                    <FaUser className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="input-control"
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="lastName" className="input-label">
                  Last name
                </label>
                <div className="input-field">
                  <div className="input-icon">
                    <FaUser className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="input-control"
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email address
              </label>
              <div className="input-spacer"></div>
              <div className="input-field">
                <div className="input-icon">
                  <FaEnvelope className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-control"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-spacer"></div>
              <div className="input-field password-field">
                <div className="input-icon">
                  <FaLock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-control"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <>
                  <svg
                    className="loading-spinner h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">
              By creating an account, you agree to our
            </div>
          </div>

          <div className="legal-links">
            <Link to="/terms" className="legal-link">
              Terms of Use
            </Link>
            <Link to="/privacy" className="legal-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;