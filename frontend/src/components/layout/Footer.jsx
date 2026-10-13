
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

  const socialLinks = [
    { label: "Instagram", icon: <FaInstagram /> },
    { label: "Facebook", icon: <FaFacebookF /> },
    { label: "Pinterest", icon: <FaPinterestP /> },
    { label: "YouTube", icon: <FaYoutube /> },
  ];

  const shopLinks = [
    "NEW ARRIVALS",
    "BRIDAL FARSHI",
    "WEDDING EDIT",
    "FESTIVE FARSHI",
    "PARTY WEAR",
    "EMBROIDERED FARSHI",
    "LUXURY FARSHI",
  ];

  return (
    <footer className="relative overflow-hidden bg-[#5A0E22] text-white">

      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        {/* Main Footer */}

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-10">

          {/* Brand */}

          <div className="min-w-0">
            <h2 className="font-serif text-2xl font-bold tracking-wide sm:text-3xl">
              THE GIRLY HOUSE
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300 sm:mt-5">
              Discover elegant fashion curated for modern women.
              Style that speaks confidence, beauty and comfort.
            </p>

            {/* Social Icons */}

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-7 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-base transition-all duration-300 hover:rotate-12 hover:bg-white hover:text-[#5A0E22] sm:h-11 sm:w-11 sm:text-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}

          <div className="min-w-0">
            <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              Shop
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="inline-block text-xs text-gray-300 transition-all duration-300 hover:translate-x-1 hover:text-pink-300 sm:text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}

          <div className="min-w-0">
            <h3 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
              Company
            </h3>

            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-300 transition hover:text-pink-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-300 transition hover:text-pink-300"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-gray-300 transition hover:text-pink-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-300 transition hover:text-pink-300"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}

          <div className="min-w-0">
            <h3 className="text-lg font-semibold sm:text-xl">
              Join Our Newsletter
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-300 sm:mt-4">
              Get exclusive offers and the latest fashion updates.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 sm:mt-6"
            >
              <label htmlFor="footer-email" className="sr-only">
                Enter your email
              </label>

              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full min-w-0 rounded-full border border-white/20 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/40 sm:px-5"
              />

              <button
                type="submit"
                className="mt-3 min-h-11 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#5A0E22] transition-all duration-300 hover:bg-pink-100 sm:mt-4"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Footer */}

        <div className="mt-10 flex flex-col items-center gap-5 border-t border-white/20 pt-6 sm:mt-12 sm:pt-8 lg:mt-16 lg:flex-row lg:justify-between">

          <p className="text-center text-xs leading-6 text-gray-300 sm:text-sm">
            © {new Date().getFullYear()} The Girly House. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs sm:gap-x-6 sm:text-sm">
            <Link
              to="/privacy-policy"
              className="text-gray-300 transition hover:text-pink-300"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-gray-300 transition hover:text-pink-300"
            >
              Terms
            </Link>

            <Link
              to="/returns"
              className="text-gray-300 transition hover:text-pink-300"
            >
              Returns
            </Link>
          </div>

        </div>
      </div>

      {/* Back To Top */}

      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        title="Back to top"
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5A0E22] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-pink-100 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
      >
        <FaArrowUp />
      </button>

    </footer>
  );
};

export default Footer;
