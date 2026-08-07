// Placeholder file
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#FFFDFC] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-[#6B1028]">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;