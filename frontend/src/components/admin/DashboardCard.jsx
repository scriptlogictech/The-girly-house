import { FaArrowUp } from "react-icons/fa";

const DashboardCard = ({
  title,
  value,
  icon,
  color = "#6B1028",
  growth = "+0%",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          <div className="flex items-center gap-2 mt-4 text-green-600 text-sm font-medium">

            <FaArrowUp />

            <span>{growth}</span>

          </div>

        </div>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;