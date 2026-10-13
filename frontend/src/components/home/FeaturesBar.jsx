
import {
  FaTruck,
  FaHeadset,
  FaLock,
  FaGem,
} from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    description:
      "You get your items delivered without any extra cost.",
  },
  {
    icon: <FaHeadset />,
    title: "Support 24/7",
    description:
      "Our customer support team is available around the clock.",
  },
  {
    icon: <FaGem />,
    title: "Premium Quality",
    description:
      "Carefully selected fabrics made for lasting comfort and style.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payment",
    description:
      "Shop with confidence because payment is safe.",
  },
];

const FeaturesBar = () => {
  return (
    <section className="bg-[#faf7f2] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">

        {/* Features Container */}

        <div className="overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-white sm:rounded-3xl">

          <div className="grid grid-cols-1 divide-y divide-dashed divide-gray-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">

            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative flex min-w-0 items-start gap-3 px-4 py-5 transition-colors duration-300 hover:bg-[#faf7f2] sm:gap-4 sm:px-5 sm:py-6 lg:flex-col lg:items-start lg:gap-4 lg:px-6 lg:py-7 ${
                  index % 2 === 0
                    ? "sm:border-r sm:border-dashed sm:border-gray-200 lg:border-r-0"
                    : ""
                } ${
                  index < 2
                    ? "sm:border-b sm:border-dashed sm:border-gray-200 lg:border-b-0"
                    : ""
                } ${
                  index !== features.length - 1
                    ? "lg:border-r lg:border-dashed lg:border-gray-200"
                    : ""
                }`}
              >

                {/* Feature Icon */}

                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#ead7dc] bg-[#faf7f2] text-xl text-[#6B1028] transition-all duration-300 group-hover:border-[#6B1028] group-hover:bg-[#6B1028] group-hover:text-white sm:h-12 sm:w-12 sm:text-2xl lg:h-14 lg:w-14">
                  {feature.icon}
                </div>

                {/* Feature Text */}

                <div className="min-w-0 flex-1 lg:w-full">
                  <h3 className="text-sm font-bold leading-snug text-[#1F2432] sm:text-base lg:text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-[13px] lg:mt-3">
                    {feature.description}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
