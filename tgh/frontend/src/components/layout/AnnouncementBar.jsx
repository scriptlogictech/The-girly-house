import { FaShippingFast } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";

const AnnouncementBar = () => {
  return (
    <div className="bg-[#6B1028] text-[#F9F4EC] text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        <div className="flex items-center gap-2">
          <FaShippingFast />
          <span>Free Shipping on Orders Above ₹999</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <MdOutlineLocalOffer />
          <span>Flat 10% OFF on Your First Order</span>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementBar;