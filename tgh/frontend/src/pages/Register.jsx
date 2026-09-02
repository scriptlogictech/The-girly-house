import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };

      await registerUser(payload);

      // Redirect to Verify OTP page
      navigate("/verify-otp", {
        state: {
          phone: values.phone,
          email: values.email,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // OAuth UI handlers
  // Connect these with your actual OAuth implementation later.
  const handleGoogleRegister = () => {
    console.log("Google Register");
  };

  const handleFacebookRegister = () => {
    console.log("Facebook Register");
  };

  const handleAppleRegister = () => {
    console.log("Apple Register");
  };

  return (
    <main className="auth-page">

      {/* Background Decorations */}

      <div className="auth-bg-circle circle-one"></div>
      <div className="auth-bg-circle circle-two"></div>

      <div className="auth-bg-line line-one"></div>
      <div className="auth-bg-line line-two"></div>


      <div className="auth-container">

        {/* =================================================
            LOGO
        ================================================= */}

       


        {/* =================================================
            REGISTER CARD
        ================================================= */}

        <div className="auth-card register-card">

          {/* Header */}

          <div className="auth-card-header">

            <div className="welcome-icon">
              <FiHeart />
            </div>

            <span className="auth-label">
              JOIN THE GIRLY HOUSE
            </span>

            <h1>
              Create Account
            </h1>

            <p>
              Create your account and discover your style.
            </p>

          </div>


          {/* =================================================
              SOCIAL REGISTER
          ================================================= */}

          <div className="social-login">

            <button
              type="button"
              className="social-button google-button"
              onClick={handleGoogleRegister}
            >
              <FcGoogle />
              <span>Google</span>
            </button>


            <button
              type="button"
              className="social-button facebook-button"
              onClick={handleFacebookRegister}
            >
              <FaFacebookF />
              <span>Facebook</span>
            </button>


            <button
              type="button"
              className="social-button apple-button"
              onClick={handleAppleRegister}
            >
              <FaApple />
              <span>Apple</span>
            </button>

          </div>


          {/* Divider */}

          <div className="auth-divider">

            <span></span>

            <p>
              OR SIGN UP WITH EMAIL
            </p>

            <span></span>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="auth-form register-form"
          >

            {/* =================================================
                NAME + PHONE
            ================================================= */}

            <div className="register-two-column">

              {/* Name */}

              <div className="auth-input-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <div className="auth-input-wrapper">

                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    className={
                      errors.name ? "has-error" : ""
                    }
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />

                </div>

                {errors.name && (
                  <span className="auth-error">
                    {errors.name.message}
                  </span>
                )}

              </div>


              {/* Phone */}

              <div className="auth-input-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="auth-input-wrapper">

                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="10-digit number"
                    autoComplete="tel"
                    className={
                      errors.phone ? "has-error" : ""
                    }
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message:
                          "Enter a valid 10-digit number",
                      },
                    })}
                  />

                </div>

                {errors.phone && (
                  <span className="auth-error">
                    {errors.phone.message}
                  </span>
                )}

              </div>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="auth-input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="auth-input-wrapper">

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={
                    errors.email ? "has-error" : ""
                  }
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

              </div>

              {errors.email && (
                <span className="auth-error">
                  {errors.email.message}
                </span>
              )}

            </div>


            {/* =================================================
                PASSWORD + CONFIRM
            ================================================= */}

            <div className="register-two-column">

              {/* Password */}

              <div className="auth-input-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create password"
                    autoComplete="new-password"
                    className={
                      errors.password
                        ? "has-error"
                        : ""
                    }
                    {...register("password", {
                      required:
                        "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Minimum 6 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    className="password-icon"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <span className="auth-error">
                    {errors.password.message}
                  </span>
                )}

              </div>


              {/* Confirm Password */}

              <div className="auth-input-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="auth-input-wrapper">

                  <input
                    id="confirmPassword"
                    type={
                      showConfirm
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className={
                      errors.confirmPassword
                        ? "has-error"
                        : ""
                    }
                    {...register(
                      "confirmPassword",
                      {
                        required:
                          "Confirm your password",
                        validate: (value) =>
                          value === password ||
                          "Passwords do not match",
                      }
                    )}
                  />

                  <button
                    type="button"
                    className="password-icon"
                    onClick={() =>
                      setShowConfirm(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showConfirm
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirm ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <span className="auth-error">
                    {
                      errors.confirmPassword
                        .message
                    }
                  </span>
                )}

              </div>

            </div>


            {/* =================================================
                TERMS
            ================================================= */}

            <label className="register-agreement">

              <input
                type="checkbox"
                required
              />

              <span className="agreement-check"></span>

              <span>
                I agree to the{" "}
                <Link to="/terms">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy">
                  Privacy Policy
                </Link>
              </span>

            </label>


            {/* =================================================
                CREATE ACCOUNT BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >

              <span>
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </span>

              {!loading && (
                <FiArrowRight />
              )}

            </button>

          </form>


          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="register-section">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>


          {/* Bottom terms */}

          <p className="auth-terms">
            Your information is securely protected
            and will never be shared without your
            permission.
          </p>

        </div>


        {/* Bottom Brand */}

        <div className="auth-bottom-brand">

          <span></span>

          <p>
            ELEGANCE • STYLE • YOU
          </p>

          <span></span>

        </div>

      </div>

    </main>
  );
};

export default Register;