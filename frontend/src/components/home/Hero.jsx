import React from "react";
import "./Hero.css";

import { FaArrowRight } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";

import heroGirl from "../../assets/girl.jpg";

const Hero = () => {
  return (
    <section className="hero">

      {/* Background Blur */}
      <div className="hero-blur hero-blur-1"></div>
      <div className="hero-blur hero-blur-2"></div>

      <div className="hero-container">

        {/* ================= LEFT ================= */}

        <div className="hero-left">

          <span className="hero-tag">
            ✨ NEW ARRIVAL 2026
          </span>

          <h1 className="hero-title">
            The Girly House
            
          </h1>

          <p className="hero-desc">
            Curated fashion collections featuring elegant dresses, handbags, and accessories for your everyday style.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">

              Shop Now

              <FaArrowRight />

            </button>

            <button className="secondary-btn">

              <FiShoppingBag />

              Explore Collection

            </button>

          </div>

          <div className="hero-stats">

            <div className="stat-card">

              <h2>40K+</h2>

              <p>Happy Customers</p>

            </div>

            <div className="stat-card">

              <h2>1200+</h2>

              <p>Premium Products</p>

            </div>

            <div className="stat-card">

              <h2>4.9</h2>

              <p>

                <BsStarFill />

                Rating

              </p>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="hero-right">

          <div className="circle-bg"></div>

          <img
            src={heroGirl}
            alt="Fashion Girl"
            className="hero-image"
          />

          {/* Floating Card */}

          <div className="floating-card top-card">

            <span>🔥 Trending</span>

            <h4>Summer Collection</h4>

          </div>

          <div className="floating-card bottom-card">

            <span>🚚 Free Shipping</span>

            <h4>On Orders Above ₹999</h4>

          </div>

          <div className="floating-review">

            <div className="review-users">

              <img
                src="https://i.pravatar.cc/40?img=1"
                alt=""
              />

              <img
                src="https://i.pravatar.cc/40?img=2"
                alt=""
              />

              <img
                src="https://i.pravatar.cc/40?img=3"
                alt=""
              />

            </div>

            <div>

              <h4>12K+</h4>

              <p>Fashion Lovers</p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;