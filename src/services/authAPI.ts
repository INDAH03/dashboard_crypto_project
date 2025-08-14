import { axiosClient } from "../config/axiosClient";

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const loginUser = async (email: string, password: string) => {
  const res = await axiosClient.post("/auth/login", { email, password });
  return res.data;
};

interface registerUser {
  name?: string; 
  email: string;
  password: string;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axiosClient.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};
