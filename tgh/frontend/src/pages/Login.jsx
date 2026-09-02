import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";
import {
  FcGoogle,
} from "react-icons/fc";
import {
  FaFacebookF,
  FaApple,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const data = await login(values);

      if (data.user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // These are UI handlers for now.
  // Connect them to your OAuth implementation later.
  const handleGoogleLogin = () => {
    console.log("Google Login");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login");
  };

  const handleAppleLogin = () => {
    console.log("Apple Login");
  };

  return (
    <main className="auth-page">

      {/* Decorative Background */}

      <div className="auth-bg-circle circle-one"></div>
      <div className="auth-bg-circle circle-two"></div>
      <div className="auth-bg-line line-one"></div>
      <div className="auth-bg-line line-two"></div>

      <div className="auth-container">

        {/* Small top brand */}

       


        {/* Main Card */}

        <div className="auth-card">

          {/* Card Header */}

          <div className="auth-card-header">

            <div className="welcome-icon">
              <FiHeart />
            </div>

            <span className="auth-label">
              WELCOME BACK
            </span>

            <h1>
              Hello, Beautiful
            </h1>

            <p>
              Sign in to continue your shopping journey.
            </p>

          </div>


          {/* Social Login */}

          <div className="social-login">

            <button
              type="button"
              className="social-button google-button"
              onClick={handleGoogleLogin}
            >
              <FcGoogle />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="social-button facebook-button"
              onClick={handleFacebookLogin}
            >
              <FaFacebookF />
              <span>Facebook</span>
            </button>

            <button
              type="button"
              className="social-button apple-button"
              onClick={handleAppleLogin}
            >
              <FaApple />
              <span>Apple</span>
            </button>

          </div>


          {/* Divider */}

          <div className="auth-divider">
            <span></span>
            <p>OR CONTINUE WITH EMAIL</p>
            <span></span>
          </div>


          {/* Login Form */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="auth-form"
          >

            {/* Email */}

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
                  className={errors.email ? "has-error" : ""}
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


            {/* Password */}

            <div className="auth-input-group">

              <div className="password-heading">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>

              <div className="auth-input-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={errors.password ? "has-error" : ""}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  className="password-icon"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
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


            {/* Remember */}

            <div className="remember-container">

              <label className="remember-me">

                <input type="checkbox" />

                <span className="checkmark"></span>

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >

              <span>
                {loading ? "Signing In..." : "Sign In"}
              </span>

              {!loading && (
                <FiArrowRight />
              )}

            </button>

          </form>


          {/* Register */}

          <div className="register-section">

            <span>
              New to The Girly House?
            </span>

            <Link to="/register">
              Create an account
            </Link>

          </div>


          {/* Terms */}

          <p className="auth-terms">
            By continuing, you agree to our{" "}
            <Link to="/terms">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy">
              Privacy Policy
            </Link>
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

export default Login;