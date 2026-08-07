import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "../../services/api";
import "./CategorySection.css";


import { motion } from "framer-motion";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/categories");

      if (response.data.success) {
        setCategories(response.data.data);
      } else {
        setError("Unable to load categories.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while loading categories."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="category-section">
        <div className="category-header">
          <span className="category-tag">SHOP BY CATEGORY</span>
          <h2>Loading Categories...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="category-section">
        <div className="category-header">
          <span className="category-tag">SHOP BY CATEGORY</span>
          <h2>{error}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="category-section">
      <div className="category-header">
        <span className="category-tag">SHOP BY CATEGORY</span>

        <h2>
          Discover Our <span>Collections</span>
        </h2>

        <p>
          Explore premium fashion collections curated for every occasion.
        </p>
      </div>

      <div className="marquee-wrapper">

  <div className="marquee-track">

    {[...categories, ...categories].map((category, index) => (

      <motion.div
        key={`${category._id}-${index}`}
        className="marquee-item"
        whileHover={{
          y: -10,
        }}
      >
        <Link
          to={`/shop/category/${category.slug}`}
          className="category-card"
        >
          <div className="category-image">

            <img
              src={
                category.image?.url ||
                "https://placehold.co/600x800?text=Category"
              }
              alt={category.name}
            />

            <div className="category-overlay">
              <button>
                Shop Now
                <FaArrowRight />
              </button>
            </div>

          </div>

          <div className="category-content">
            <h3>{category.name}</h3>

            <p>
              {category.description ||
                "Explore our latest collection"}
            </p>
          </div>

        </Link>

      </motion.div>

    ))}

  </div>

</div>

      <div className="category-bottom">
        <div className="category-banner">
          <div className="banner-content">
            <span>✨ Premium Fashion Collection</span>

            <h2>
              Fashion That Defines
              <br />
              Your Personality
            </h2>

            <p>
              Discover elegant styles, premium fabrics, and timeless fashion
              made for confident women.
            </p>
          </div>

          <Link to="/shop" className="view-all-btn">
            View All Products
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;