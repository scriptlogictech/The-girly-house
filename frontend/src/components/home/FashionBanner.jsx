
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "./FashionBanner.css";
import banner from "../../assets/fashionbanner2.png";

const FashionBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#24151a]">

      {/* Background Image */}

      <img
        src={banner}
        alt="Fashion Collection"
        className="h-[570px] w-full object-cover object-[65%_center] sm:h-[600px] md:h-[620px] lg:h-[650px] lg:object-center"
      />

      {/* Responsive Dark Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25 sm:via-black/45 sm:to-transparent" />

      {/* Decorative Circle */}

      <div className="pointer-events-none absolute -left-24 top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl sm:-left-20 sm:top-20 sm:h-72 sm:w-72" />

      {/* Content */}

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-20">

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="max-w-xl"
          >

            {/* Offer Badge */}

            <span className="inline-block rounded-full bg-[#6B1028] px-3 py-2 text-[10px] font-semibold tracking-[2px] text-white sm:px-5 sm:text-xs md:text-sm md:tracking-[3px]">
              LIMITED TIME OFFER
            </span>

            {/* Heading */}

            <h2 className="banner-title mt-5 text-4xl font-bold leading-[1.12] text-white sm:mt-7 sm:text-5xl md:text-6xl lg:mt-8 lg:text-7xl">
              Flat
              <br />
              <span className="text-[#FFD166]">
                30% OFF
              </span>
            </h2>

            {/* Subtitle */}

            <p className="banner-text mt-4 max-w-md text-sm leading-6 text-gray-200 sm:mt-5 sm:text-base sm:leading-7 md:mt-6 md:text-lg md:leading-8">
              Upgrade your wardrobe with our latest premium collection.
              <br className="hidden sm:block" />
              <span className="sm:inline">
                {" "}Elegant styles designed for every woman.
              </span>
            </p>

            {/* Coupon Code */}

            <div className="mt-5 sm:mt-7 md:mt-8">
              <div className="inline-flex max-w-full items-center rounded-lg border border-white/30 bg-white px-3 py-3 text-xs font-bold tracking-[1px] text-[#6B1028] shadow-lg sm:px-5 sm:py-3 sm:text-sm sm:tracking-[2px] md:px-6">
                USE CODE : GIRLY30
              </div>
            </div>

            {/* Shop Button */}

            <Link
              to="/shop"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#6B1028] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6B1028] hover:text-white sm:mt-8 sm:px-8 sm:py-4 sm:text-base md:mt-10"
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
