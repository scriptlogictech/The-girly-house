import { FaStarOfLife } from "react-icons/fa";

const items = [
  "NEW ARRIVALS",
  "DRESSES",
  "TOPS",
  "CO-ORD SETS",
  "KURTIS",
  "JEANS",
  "BLAZERS",
  "HANDBAGS",
];

const MarqueeBanner = () => {
  return (
    <section className="bg-[#171A2C] overflow-hidden py-6">

      <div className="flex whitespace-nowrap animate-marquee">

        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center mx-5 shrink-0"
          >
            <h2 className="text-white text-4xl font-extrabold uppercase tracking-wide">
              {item}
            </h2>

            <FaStarOfLife
              className="mx-12 text-[#B40D38]"
              size={24}
            />
          </div>
        ))}

      </div>

    </section>
  );
};

export default MarqueeBanner;