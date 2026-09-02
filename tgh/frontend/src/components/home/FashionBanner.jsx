import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "./FashionBanner.css"
import banner from "../../assets/fashionbanner2.jpg";

const FashionBanner = () => {
  return (
    <section className="relative my-24 overflow-hidden rounded-none">

      {/* Background Image */}

      <img
        src={banner}
        alt="Fashion Collection"
        className="w-full h-[600px] object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

      {/* Decorative Circle */}

      <div className="absolute -left-20 top-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}

      <div className="absolute inset-0 flex items-center">

        <div className="container mx-auto px-6 lg:px-20">

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >

            {/* Offer Badge */}

            <span  className="inline-block bg-[#6B1028] text-white px-5 py-2 rounded-full text-sm tracking-widest font-semibold">

              LIMITED TIME OFFER

            </span>

            {/* Heading */}

            <h2 className="banner-title text-white text-5xl lg:text-7xl font-bold leading-tight mt-8">

              Flat
              <br />

              <span className="text-[#FFD166]">
                30% OFF
              </span>

            </h2>

            {/* Subtitle */}

            <p className="banner-text mt-6 text-gray-200 text-lg leading-8">

              Upgrade your wardrobe with our latest
              premium collection.

              <br />

              Elegant styles designed for every woman.

            </p>

            {/* Coupon */}

            <div className="mt-8 flex items-center gap-4">

              <div className="bg-white text-[#6B1028] px-6 py-3 rounded-lg font-bold tracking-widest">

                USE CODE : GIRLY30

              </div>

            </div>

            {/* Button */}

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 mt-10 bg-white text-[#6B1028] hover:bg-[#6B1028] hover:text-white transition-all duration-300 px-8 py-4 rounded-full font-semibold"
            >

              Shop Now

              <FaArrowRight />

            </Link>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default FashionBanner;