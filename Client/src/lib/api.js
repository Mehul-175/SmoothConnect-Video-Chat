import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const onboard = async (onboardData) => {
  const res = await axiosInstance.post("/auth/onboard", onboardData);
  return res.data;
}