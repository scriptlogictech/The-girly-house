
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRegEdit,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  // Keep form values in sync with the authenticated user.
  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");

    const defaultAddress = user?.addresses?.find(
      (item) => item.isDefault
    );

    if (defaultAddress) {
      const parts = [
        defaultAddress.house,
        defaultAddress.street,
        defaultAddress.landmark,
        defaultAddress.city,
        defaultAddress.state,
        defaultAddress.pincode,
        defaultAddress.country,
      ].filter(Boolean);

      setAddress(parts.join(", "));
    } else {
      setAddress("");
    }
  }, [user]);

  const avatarLetter =
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!name.trim()) {
      return;
    }

    if (!phone.trim()) {
      return;
    }

    try {
      setSaving(true);

      await updateProfile({
        name: name.trim(),
        phone: phone.trim(),
      });
    } catch (error) {
      // AuthContext displays the API error notification.
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-[#FFFDFC] px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#eee3df] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8edf0] text-[#6B1028]">
            <FaUser size={26} />
          </div>

          <h2 className="text-2xl font-semibold text-[#321820]">
            Please Login
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Please log in to view and manage your profile.
          </p>

          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#6B1028] px-7 py-3 font-medium text-white transition hover:bg-[#52101F]"
          >
            Login to Continue
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFFDFC] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8c5260]">
            The Girly House by Manisha
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-[#321820] sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Manage your personal information and keep your
            account details up to date.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Profile Summary */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-[#eee3df] bg-white shadow-sm">
            <div className="h-2 bg-[#6B1028]" />

            <div className="px-6 py-8 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#f5e6e8] bg-[#6B1028] text-3xl font-semibold text-white shadow-sm">
                {avatarLetter}
              </div>

              <h2 className="mt-5 break-words text-xl font-semibold text-[#321820]">
                {user?.name || "Customer"}
              </h2>

              <p className="mt-2 break-all text-sm text-gray-500">
                {user?.email}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f8edf0] px-4 py-2 text-xs font-medium text-[#6B1028]">
                <FaShieldAlt />
                Customer Account
              </div>
            </div>

            <div className="border-t border-[#f0e7e3] px-6 py-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#6B1028]">
                  <FaEnvelope />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Registered Email
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-[#321820]">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <div className="mt-0.5 text-[#6B1028]">
                  <FaPhone />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Phone Number
                  </p>
                  <p className="mt-1 break-words text-sm font-medium text-[#321820]">
                    {user?.phone || "Not added"}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Edit Profile Form */}
          <div className="overflow-hidden rounded-2xl border border-[#eee3df] bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-[#f0e7e3] px-5 py-5 sm:px-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f8edf0] text-[#6B1028]">
                <FaRegEdit size={19} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#321820] sm:text-xl">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your details below.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-5 sm:p-8"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-[#321820]"
                >
                  Full Name <span className="text-[#6B1028]">*</span>
                </label>

                <div className="relative">
                  <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8c5260]" />

                  <input
                    id="profile-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-[#e8dcd8] bg-[#fffefd] py-3.5 pl-11 pr-4 text-sm text-[#321820] outline-none transition placeholder:text-gray-400 focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-medium text-[#321820]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8c5260]" />

                  <input
                    id="profile-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-[#eee3df] bg-[#f8f6f4] py-3.5 pl-11 pr-4 text-sm text-gray-500 outline-none"
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Your registered email cannot be changed here.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="profile-phone"
                  className="mb-2 block text-sm font-medium text-[#321820]"
                >
                  Phone Number <span className="text-[#6B1028]">*</span>
                </label>

                <div className="relative">
                  <FaPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8c5260]" />

                  <input
                    id="profile-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    maxLength={20}
                    className="w-full rounded-xl border border-[#e8dcd8] bg-[#fffefd] py-3.5 pl-11 pr-4 text-sm text-[#321820] outline-none transition placeholder:text-gray-400 focus:border-[#6B1028] focus:ring-2 focus:ring-[#6B1028]/10"
                  />
                </div>
              </div>

              {/* Saved Address - display only */}
              <div>
                <label
                  htmlFor="profile-address"
                  className="mb-2 block text-sm font-medium text-[#321820]"
                >
                  Default Address
                </label>

                <div className="relative">
                  <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-4 text-sm text-[#8c5260]" />

                  <textarea
                    id="profile-address"
                    name="address"
                    value={address}
                    readOnly
                    rows={3}
                    placeholder="No default address saved yet."
                    className="w-full cursor-not-allowed resize-y rounded-xl border border-[#eee3df] bg-[#f8f6f4] py-3.5 pl-11 pr-4 text-sm leading-6 text-gray-600 outline-none"
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Manage your delivery addresses in the address
                  section at checkout.
                </p>
              </div>

              {/* Save Button */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#f0e7e3] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-gray-500">
                  Your changes are saved to your account.
                </p>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B1028] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#52101F] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaRegEdit />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#eee3df] bg-white p-4 sm:p-5">
          <FaShieldAlt className="mt-0.5 shrink-0 text-[#6B1028]" />

          <p className="text-xs leading-6 text-gray-600 sm:text-sm">
            Your profile information is associated with your
            account and is used to help manage your orders and
            customer experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
