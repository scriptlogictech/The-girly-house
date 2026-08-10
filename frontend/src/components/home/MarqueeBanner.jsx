import { FaStarOfLife } from "react-icons/fa";
import "./MarqueeBanner.css";

const items = [
  "NEW ARRIVALS",
  "DRESSES",
  "TOPS",
  "CO-ORD SETS",
  "KURTIS",
  "JEANS",
  "SALWAR SUITS",
];

const WaveDecoration = ({ position }) => {
  return (
    <div className={`marquee-wave marquee-wave--${position}`}>
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 32 C120 4 180 4 300 32 S480 60 600 32 S780 4 900 32 S1080 60 1200 32 S1320 4 1440 32" />

        <path d="M0 37 C120 9 180 9 300 37 S480 65 600 37 S780 9 900 37 S1080 65 1200 37 S1320 9 1440 37" />

        <path d="M0 42 C120 14 180 14 300 42 S480 70 600 42 S780 14 900 42 S1080 70 1200 42 S1320 14 1440 42" />

        <path d="M0 47 C120 19 180 19 300 47 S480 75 600 47 S780 19 900 47 S1080 75 1200 47 S1320 19 1440 47" />
      </svg>
    </div>
  );
};

const MarqueeBanner = () => {
  return (
    <section className="marquee-banner">

      {/* Top decorative wave */}
      <WaveDecoration position="top" />

      {/* Marquee content */}
      <div className="marquee-banner__track">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="marquee-banner__item"
          >
            <h2>{item}</h2>

            <FaStarOfLife className="marquee-banner__star" />
          </div>
        ))}
      </div>

      {/* Bottom decorative wave */}
      <WaveDecoration position="bottom" />

    </section>
  );
};

export default MarqueeBanner;