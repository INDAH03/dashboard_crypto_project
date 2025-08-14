import { axiosClient } from "../config/axiosClient";

export const getCryptoPrices = async (page = 1, per_page = 50) => {
  const res = await axiosClient.get("/crypto-prices", {
    params: { page, per_page },
  });
  return res.data;
};

export const getCryptoDetail = async (id: string) => {
  const res = await axiosClient.get(`/crypto-prices/${id}`);
  return res.data;
};

export const getCryptoNews = async (page: number, pageSize: number) => {
  const res = await axiosClient.get("/news", {
    params: { page, pageSize },
  });
  return res.data;
};

export const getTopCoins = async () => {
  const res = await axiosClient.get("/top-coins");
  return res.data; 
};






