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
  const { products, loading } =
    useNewArrivalProducts();

  if (loading) {
    return (
      <section className=" bg-[#FAF7F2]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">
            Loading New Arrivals...
          </h2>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container mx-auto px-4 text-center">

          <p className="text-[#6B1028] uppercase tracking-[3px]">
            NEW COLLECTION
          </p>

          <h2 className="text-5xl font-bold mt-3">
            New Arrivals
          </h2>

          <p className="mt-5 text-gray-500">
            No new arrivals available.
          </p>

        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#FAF7F2]">

      <div className="container mx-auto px-4">

        {/* Heading */}

        <div className="flex justify-between items-end mb-12">

          <div>

            <p className="uppercase tracking-[4px] text-[#6B1028] font-semibold">
              NEW COLLECTION
            </p>

            <h2 className="text-5xl font-bold mt-2">
              New Arrivals
            </h2>

            <p className="text-gray-500 mt-4 max-w-xl">
              Discover our newest fashion pieces carefully
              selected for every season.
            </p>

          </div>

          <Link
            to="/shop"
            className="hidden md:block bg-[#6B1028] hover:bg-[#4b0b1d] text-white px-6 py-3 rounded-full transition"
          >
            View All
          </Link>

        </div>

        {/* Navigation */}

        <div className="flex justify-end gap-3 mb-6">

          <button className="new-prev w-12 h-12 rounded-full border bg-white hover:bg-[#6B1028] hover:text-white transition flex items-center justify-center">

            <FaArrowLeft />

          </button>

          <button className="new-next w-12 h-12 rounded-full border bg-white hover:bg-[#6B1028] hover:text-white transition flex items-center justify-center">

            <FaArrowRight />

          </button>

        </div>

        {/* Slider */}

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
          ]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
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
              slidesPerView: 1,
            },

            640: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },

            1280: {
              slidesPerView: 4,
            },
          }}
        >

          {products.map((product) => (

            <SwiperSlide key={product._id}>

              <NewArrivalCard
                product={product}
              />

            </SwiperSlide>

          ))}

        </Swiper>

        {/* Mobile Button */}

        <div className="flex justify-center mt-10 md:hidden">

          <Link
            to="/shop"
            className="bg-[#6B1028] text-white px-8 py-3 rounded-full"
          >
            View All Products
          </Link>

        </div>

      </div>

    </section>
  );
};

export default NewArrivals;