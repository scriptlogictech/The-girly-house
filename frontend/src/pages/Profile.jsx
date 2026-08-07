// Placeholder file
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-[#6B1028]">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 rounded-full bg-[#6B1028] text-white flex items-center justify-center text-4xl font-bold">
              S
            </div>

            <h2 className="text-2xl font-semibold mt-4">
              Satyam Kumar
            </h2>

            <p className="text-gray-500">
              Customer
            </p>
          </div>

          {/* Profile Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaUser />
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Satyam Kumar"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
              />
            </div>

            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaEnvelope />
                Email
              </label>

              <input
                type="email"
                defaultValue="satyam@example.com"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
              />
            </div>

            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaPhone />
                Phone Number
              </label>

              <input
                type="text"
                defaultValue="+91 9876543210"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
              />
            </div>

            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaMapMarkerAlt />
                Address
              </label>

              <input
                type="text"
                defaultValue="Pune, Maharashtra"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button className="bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;