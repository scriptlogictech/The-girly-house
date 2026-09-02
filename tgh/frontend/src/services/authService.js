import API from "./api";

export const register = async (payload) => {
  const { data } = await API.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await API.post("/auth/login", payload);
  return data;
};

export const verifyPhoneOtp = async (payload) => {
  const { data } = await API.post("/auth/verify-phone-otp", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get("/auth/me");
  return data;
};