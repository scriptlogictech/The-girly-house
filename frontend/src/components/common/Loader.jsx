// Placeholder file
import "./Loader.css";
import logo from "../../assets/loader.png";

const Loader = () => {
  return (
    <div className="logo-loader">
      <div className="logo-loader__content">

        {/* Rotating Ring */}
        <div className="logo-loader__ring">
          <div className="logo-loader__ring-inner"></div>
        </div>

        {/* Logo */}
        <div className="logo-loader__logo">
          <img
            src={logo}
            alt="The Girly House"
          />
        </div>

        {/* Loading Dots */}
        <div className="logo-loader__dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </div>
  );
};

export default Loader;