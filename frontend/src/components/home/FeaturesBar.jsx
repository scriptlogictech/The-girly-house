import {
  FaTruck,
  FaHeadset,
  FaUndoAlt,
  FaLock,
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
    icon: <FaUndoAlt />,
    title: "Return Available",
    description:
      "Making it easy to return any items if you're not satisfied.",
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
    <section className="py-10 bg-[#faf7f2]">

      <div className="container mx-auto px-4">

        <div className="relative bg-white border border-dashed border-black-300 rounded-[36px] overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => (

              <div
                key={index}
                className="relative px-4 py-5 transition-all duration-300 hover:bg-[#faf7f2]"
              >

                <div className="flex items-start gap-6">

                  {/* Icon */}

                  <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-[#6B1028] text-3xl flex-shrink-0 bg-white">

                    {feature.icon}

                  </div>

                  {/* Text */}

                  <div>

                    <h3 className="text-[19px] font-bold text-[#1F2432] leading-tight">

                      {feature.title}

                    </h3>

                    <p className="mt-4 text-[13.5px] leading-9 text-gray-500">

                      {feature.description}

                    </p>

                  </div>

                </div>

                {/* Divider */}

                {index !== features.length - 1 && (

                  <div className="hidden lg:flex absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex-col items-center z-10">

                    <div className="w-[2px] h-14 bg-gray-400 rounded-full"></div>

                    <div className="w-3 h-3 rounded-full bg-gray-500 my-1"></div>

                    <div className="w-[2px] h-14 bg-gray-400 rounded-full"></div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default FeaturesBar;