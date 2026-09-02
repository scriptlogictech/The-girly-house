import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  // ==========================================
  // User Data
  // ==========================================

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(
    user?.address || ""
  );

  // ==========================================
  // Not Logged In
  // ==========================================

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] py-12">
        <div className="max-w-5xl mx-auto px-4">

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <h2 className="text-2xl font-semibold text-gray-800">
              Please Login
            </h2>

            <p className="text-gray-500 mt-2">
              You need to login to view your profile.
            </p>

          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // Avatar
  // ==========================================

  const avatarLetter =
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  // ==========================================
  // Save
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // We will connect this to the backend
    // update profile API next.

    console.log("Profile Data:", {
      name,
      email,
      phone,
      address,
    });

    alert("Profile update API will be connected next.");
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section className="min-h-screen bg-[#FFFDFC] py-12">

      <div className="max-w-5xl mx-auto px-4">

        {/* =====================================
            Heading
        ===================================== */}

        <div className="mb-10">

          <h1 className="text-4xl font-serif text-[#6B1028]">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information.
          </p>

        </div>

        {/* =====================================
            Profile Card
        ===================================== */}

        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* ===================================
              Avatar
          =================================== */}

          <div className="flex flex-col items-center mb-10">

            <div className="w-28 h-28 rounded-full bg-[#6B1028] text-white flex items-center justify-center text-4xl font-bold">

              {avatarLetter}

            </div>

            <h2 className="text-2xl font-semibold mt-4">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-500">
              Customer
            </p>

          </div>

          {/* ===================================
              Profile Form
          =================================== */}

          <form onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Full Name */}

              <div>

                <label className="font-medium flex items-center gap-2 mb-2">

                  <FaUser />

                  Full Name

                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
                  placeholder="Enter your full name"
                />

              </div>

              {/* Email */}

              <div>

                <label className="font-medium flex items-center gap-2 mb-2">

                  <FaEnvelope />

                  Email

                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
                  placeholder="Enter your email"
                />

              </div>

              {/* Phone */}

              <div>

                <label className="font-medium flex items-center gap-2 mb-2">

                  <FaPhone />

                  Phone Number

                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
                  placeholder="Enter your phone number"
                />

              </div>

              {/* Address */}

              <div>

                <label className="font-medium flex items-center gap-2 mb-2">

                  <FaMapMarkerAlt />

                  Address

                </label>

                <input
                  type="text"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#6B1028]"
                  placeholder="Enter your address"
                />

              </div>

            </div>

            {/* =================================
                Save Button
            ================================= */}

            <div className="mt-8">

              <button
                type="submit"
                className="bg-[#6B1028] hover:bg-[#541020] text-white px-8 py-3 rounded-lg transition"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Profile;