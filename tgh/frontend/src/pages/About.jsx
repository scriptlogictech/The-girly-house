import { FaHeart, FaLeaf, FaShippingFast, FaAward } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaHeart className="text-4xl text-[#6B1028]" />,
      title: "Made with Love",
      description:
        "Every collection is thoughtfully designed to make women feel confident, elegant, and beautiful.",
    },
    {
      icon: <FaLeaf className="text-4xl text-[#6B1028]" />,
      title: "Premium Quality",
      description:
        "We carefully select fabrics that offer comfort, durability, and timeless style.",
    },
    {
      icon: <FaShippingFast className="text-4xl text-[#6B1028]" />,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping across India with secure packaging.",
    },
    {
      icon: <FaAward className="text-4xl text-[#6B1028]" />,
      title: "Trusted Brand",
      description:
        "Our customers trust us for quality, affordability, and excellent service.",
    },
  ];

  return (
    <div className="bg-[#FFFDFC]">

      {/* Hero Section */}
      <section className="bg-[#6B1028] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            About The Girly House
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-200">
            Fashion is more than clothing—it's confidence, personality,
            and self-expression. At The Girly House, we create collections
            that celebrate every woman's unique style.
          </p>

        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900"
              alt="Our Story"
              className="rounded-2xl shadow-lg w-full object-cover h-[500px]"
            />
          </div>

          <div>

            <h2 className="text-4xl font-serif text-[#6B1028] mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              The Girly House was born from a passion for creating beautiful,
              elegant, and affordable fashion for modern women. Our goal is to
              inspire confidence through carefully curated collections that
              combine timeless style with everyday comfort.
            </p>

            <p className="text-gray-600 leading-8">
              Whether you're dressing for work, celebrations, or casual outings,
              we believe every woman deserves fashion that reflects her
              individuality. Every design is selected with love, keeping quality
              and comfort at the heart of everything we do.
            </p>

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#F8F2EA]">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-serif text-[#6B1028] mb-4">
              Why Choose Us
            </h2>

            <p className="text-gray-600">
              Designed with quality, comfort, and elegance in mind.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 text-center"
              >
                <div className="flex justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-5xl font-bold text-[#6B1028]">
                5K+
              </h3>
              <p className="text-gray-600 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#6B1028]">
                500+
              </h3>
              <p className="text-gray-600 mt-2">
                Fashion Products
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#6B1028]">
                50+
              </h3>
              <p className="text-gray-600 mt-2">
                Premium Collections
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-[#6B1028]">
                100%
              </h3>
              <p className="text-gray-600 mt-2">
                Customer Satisfaction
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#6B1028] py-20 text-white">

        <div className="max-w-5xl mx-auto text-center px-4">

          <h2 className="text-4xl font-serif mb-6">
            Discover Your Perfect Style
          </h2>

          <p className="text-gray-200 text-lg mb-8">
            Explore our latest collections and find fashion that inspires confidence every day.
          </p>

          <a
            href="/shop"
            className="inline-block bg-white text-[#6B1028] px-8 py-4 rounded-full font-semibold hover:bg-[#F8F2EA] transition"
          >
            Shop Now
          </a>

        </div>

      </section>

    </div>
  );
};

export default About;