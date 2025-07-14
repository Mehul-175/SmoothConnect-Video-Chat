import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
      const res = await axiosInstance.post("/auth/signup", signupData)
      return res.data
    }