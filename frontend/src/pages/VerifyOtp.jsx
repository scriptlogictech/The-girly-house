import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { verifyOtp } = useAuth();

  // Email received from Register page
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // OTP timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    try {
      setLoading(true);

      await verifyOtp({
        email,
        otp,
      });

      toast.success("Email verified successfully!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFFDFC] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-[#6B1028]">
          Verify OTP
        </h1>

        {/* Description */}
        <p className="text-center text-gray-500 mt-3">
          Enter the OTP sent to
        </p>

        {/* Email */}
        <p className="text-center font-semibold mt-1 break-all">
          {email}
        </p>

        {/* OTP Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(/\D/g, "")
              )
            }
            placeholder="Enter 6-digit OTP"
            className="w-full border rounded-lg p-4 text-center text-2xl tracking-[10px] outline-none focus:border-[#6B1028]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B1028] text-white rounded-lg py-3 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <b>{timer}s</b>
            </p>
          ) : (
            <button
              type="button"
              className="text-[#6B1028] font-semibold"
              onClick={() =>
                toast.info(
                  "Resend OTP API will be added next."
                )
              }
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;