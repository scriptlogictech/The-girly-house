import API from "./api";

// ==========================================
// REGISTER
// ==========================================

export const register = async (payload) => {
  const { data } = await API.post(
    "/auth/register",
    payload
  );

  return data;
};

// ==========================================
// LOGIN
// ==========================================

export const login = async (payload) => {
  const { data } = await API.post(
    "/auth/login",
    payload
  );

  return data;
};

// ==========================================
// VERIFY EMAIL OTP
// ==========================================

export const verifyEmailOtp = async (payload) => {
  const { data } = await API.post(
    "/auth/verify-email-otp",
    payload
  );

  return data;
};

// ==========================================
// GET PROFILE
// ==========================================

export const getProfile = async () => {
  const { data } = await API.get("/auth/me");

  return data;
};