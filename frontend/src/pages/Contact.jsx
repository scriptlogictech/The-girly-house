// Placeholder file
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="min-h-screen bg-[#FFFDFC] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-serif text-[#6B1028] mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about
            our products, an order, or anything else, our team is ready to
            help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-3xl font-serif text-[#6B1028] mb-6">
              Send us a Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B1028]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#6B1028]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-14 h-14 rounded-full bg-[#F8F2EA] flex items-center justify-center">
                <FaMapMarkerAlt className="text-[#6B1028] text-xl" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Our Address
                </h3>

                <p className="text-gray-600">
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-14 h-14 rounded-full bg-[#F8F2EA] flex items-center justify-center">
                <FaPhoneAlt className="text-[#6B1028] text-xl" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-14 h-14 rounded-full bg-[#F8F2EA] flex items-center justify-center">
                <FaEnvelope className="text-[#6B1028] text-xl" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Email
                </h3>

                <p className="text-gray-600">
                  support@thegirlyhouse.com
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-5 items-start">
              <div className="w-14 h-14 rounded-full bg-[#F8F2EA] flex items-center justify-center">
                <FaClock className="text-[#6B1028] text-xl" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Saturday
                </p>

                <p className="text-gray-600">
                  10:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Placeholder */}
        <div className="mt-16">
          <div className="bg-gray-200 rounded-2xl h-[400px] flex items-center justify-center">
            <p className="text-gray-600 text-lg">
              Google Map will be integrated here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;