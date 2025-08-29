// import { axiosClient } from "../config/axiosClient";

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// export const loginUser = async (email: string, password: string) => {
//   const res = await axiosClient.post("/auth/login", { email, password });
//   return res.data;
// };

// interface registerUser {
//   name?: string; 
//   email: string;
//   password: string;
// }

// export const registerUser = async (
//   name: string,
//   email: string,
//   password: string
// ) => {
//   const res = await axiosClient.post("/auth/register", {
//     name,
//     email,
//     password,
//   });
//   return res.data;
// };

import { axiosClient } from "../config/axiosClient";

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginResponse {
  token: string;
  name: string;
  email: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await axiosClient.post<LoginResponse>("/login", {
    email,
    password,
  });
  return res.data; 
};


// export const loginUser = (email: string, password: string) => {
//   return axiosClient.post("/login", { email, password });
// };

// === REGISTER ===
export const registerUser = async (name: string, email: string, password: string) => {
  const res = await axiosClient.post("/register", {
    name,
    email,
    password,
  });
  return res.data;
};

// === GET PROFILE ===
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return axiosClient.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// === UPDATE PROFILE ===
export const updateProfile = async (data: { name?: string; email?: string; password?: string }) => {
  const res = await axiosClient.put("/profile", data);
  return res.data;
};
