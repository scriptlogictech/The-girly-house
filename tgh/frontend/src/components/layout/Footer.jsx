import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    alert("Thank you for subscribing ❤️");

    setEmail("");
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#5A0E22] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-bold tracking-wider">
              THE GIRLY HOUSE
            </h2>

            <p className="mt-5 text-gray-300 leading-7">

              Discover elegant fashion curated
              for modern women.

              Style that speaks confidence,
              beauty and comfort.

            </p>

            <div className="flex gap-4 mt-8">

              {[
                <FaInstagram />,
                <FaFacebookF />,
                <FaPinterestP />,
                <FaYoutube />,
              ].map((icon, index) => (
                <div
                  key={index}
                  className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#5A0E22] hover:rotate-12 transition-all duration-300"
                >
                  {icon}
                </div>
              ))}

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Shop
            </h3>

            <ul className="space-y-4">

              {[
                "New Arrivals",
                "Trending",
                "Dresses",
                "Tops",
                "Accessories",
              ].map((item) => (

                <li key={item}>

                  <Link
                    to="/shop"
                    className="text-gray-300 hover:text-pink-300 hover:translate-x-2 inline-block transition-all"
                  >
                    {item}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Company
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-pink-300 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-pink-300 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-pink-300 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="text-gray-300 hover:text-pink-300 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-xl font-semibold">
              Join Our Newsletter
            </h3>

            <p className="text-gray-300 mt-4">

              Get exclusive offers and latest
              fashion updates.

            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6"
            >

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full px-5 py-3 rounded-full text-black outline-none"
              />

              <button
                className="w-full mt-4 bg-white text-[#5A0E22] font-semibold py-3 rounded-full hover:scale-105 transition"
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>



                {/* Bottom */}

        <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-300 text-sm text-center">
            © {new Date().getFullYear()} The Girly House.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <Link
              to="#"
              className="text-gray-300 hover:text-pink-300 transition"
            >
              Privacy
            </Link>

            <Link
              to="#"
              className="text-gray-300 hover:text-pink-300 transition"
            >
              Terms
            </Link>

            <Link
              to="#"
              className="text-gray-300 hover:text-pink-300 transition"
            >
              Returns
            </Link>

          </div>

        </div>

      </div>

      {/* Back To Top */}

      <button
        onClick={scrollTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white text-[#5A0E22] shadow-lg flex items-center justify-center hover:scale-110 hover:bg-pink-100 transition-all duration-300 z-50"
      >
        <FaArrowUp />
      </button>

    </footer>
  );
};

export default Footer;