import { Link } from "react-router-dom";
import heroImage from "../../assets/girl.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      {/* Decorative background */}
      <div className="hero__decor hero__decor--ring"></div>
      <div className="hero__decor hero__decor--line"></div>

      <div className="hero__inner">

        {/* ================= LEFT CONTENT ================= */}
        <div className="hero__content">

          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            New Collection
          </div>

          <h1 className="hero__title">
            Elegance in
            <br />
            <span>Every Thread</span>
          </h1>

          <p className="hero__subtitle">
            Discover handpicked Salwar Suits and Kurtis crafted for the
            modern woman — timeless silhouettes, rich fabrics, and detailing
            that carries tradition into everyday wear.
          </p>

          <div className="hero__buttons">

            <Link
              to="/shop?category=salwar"
              className="hero__btn hero__btn--primary"
            >
              <span>Shop Salwar Suits</span>
              <span className="hero__btn-arrow">→</span>
            </Link>

            <Link
              to="/shop?category=kurtis"
              className="hero__btn hero__btn--secondary"
            >
              <span>Explore Kurtis</span>
              <span className="hero__btn-arrow">→</span>
            </Link>

          </div>
        </div>

        {/* ================= RIGHT VISUAL ================= */}
        <div className="hero__visual">

          {/* Decorative rings around image */}
          <div className="hero__ring hero__ring--one"></div>
          <div className="hero__ring hero__ring--two"></div>

          <div className="hero__image-frame">

            <img
              src={heroImage}
              alt="Woman wearing a premium Girly House salwar suit"
              className="hero__image"
            />

          </div>

          {/* Floating card */}
          <div className="hero__card">
            <span className="hero__card-title">
              Timeless Ethnic Wear
            </span>

            <span className="hero__card-subtitle">
              Made for Every Occasion
            </span>
          </div>

          {/* Decorative dot */}
          <span className="hero__decor-dot"></span>

        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span>Scroll to explore</span>
        <span className="hero__scroll-line"></span>
      </div>

      {/* Back to top */}
      <button
        type="button"
        className="hero__top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
      >
        ↑
      </button>

    </section>
  );
}