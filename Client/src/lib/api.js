import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onboard = async (onboardData) => {
  const res = await axiosInstance.post("/auth/onboard", onboardData);
  return res.data;
}

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
}

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
}