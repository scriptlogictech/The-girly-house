
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useNewArrivalProducts from "../../hooks/useNewArrivalProducts";
import NewArrivalCard from "./NewArrivalCard";

const NewArrivals = () => {
  const { products, loading } = useNewArrivalProducts();

  if (loading) {
    return (
      <section className="bg-[#FAF7F2] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-[#6B1028] sm:text-3xl lg:text-4xl">
            Loading New Arrivals...
          </h2>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="bg-[#FAF7F2] px-4 py-12 text-center sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#6B1028] sm:text-sm sm:tracking-[3px]">
            New Collection
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#292323] sm:text-4xl lg:text-5xl">
            New Arrivals
          </h2>

          <p className="mt-4 text-sm text-gray-500 sm:text-base">
            No new arrivals available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden bg-[#FAF7F2] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}

        <div className="mb-7 flex items-end justify-between gap-3 sm:mb-9 lg:mb-10">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#6B1028] sm:text-sm sm:tracking-[3px]">
              New Collection
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#292323] sm:text-4xl lg:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-3 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm md:text-base">
              Discover our newest fashion pieces carefully selected for every season.
            </p>
          </div>

          {/* Desktop View All */}

          <Link
            to="/shop"
            className="mb-1 hidden shrink-0 items-center gap-2 rounded-full bg-[#6B1028] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#4b0b1d] lg:inline-flex"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>

        {/* Slider Navigation */}

        <div className="mb-4 flex justify-end gap-2 sm:mb-6 sm:gap-3">
          <button
            type="button"
            aria-label="Previous new arrivals"
            className="new-prev flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-[#6B1028] transition-colors duration-300 hover:border-[#6B1028] hover:bg-[#6B1028] hover:text-white sm:h-11 sm:w-11 sm:text-base"
          >
            <FaArrowLeft />
          </button>

          <button
            type="button"
            aria-label="Next new arrivals"
            className="new-next flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-[#6B1028] transition-colors duration-300 hover:border-[#6B1028] hover:bg-[#6B1028] hover:text-white sm:h-11 sm:w-11 sm:text-base"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Responsive Product Slider */}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}
          loop={products.length > 2}
          watchOverflow
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".new-prev",
            nextEl: ".new-next",
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.35,
              spaceBetween: 12,
            },
            380: {
              slidesPerView: 1.6,
              spaceBetween: 14,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
          }}
          className="new-arrivals-swiper !overflow-visible pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
              <NewArrivalCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile and Tablet View All */}

        <div className="mt-6 flex justify-center lg:hidden">
          <Link
            to="/shop"
            className="inline-flex min-h-11 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#6B1028] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#4b0b1d] sm:text-base"
          >
            View All Products
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Swiper Pagination and Card Styling */}

      <style>{`
        .new-arrivals-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .new-arrivals-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #6B1028;
          opacity: 0.3;
        }

        .new-arrivals-swiper .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 10px;
          opacity: 1;
        }

        .new-arrivals-swiper .swiper-slide {
          min-width: 0;
          height: auto;
        }

        @media (max-width: 380px) {
          .new-arrivals-swiper .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
          }

          .new-arrivals-swiper .swiper-pagination-bullet-active {
            width: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default NewArrivals;
