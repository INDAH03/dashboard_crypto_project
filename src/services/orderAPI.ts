import { axiosClient } from "../config/axiosClient";

export const getOrders = async () => {
  const res = await axiosClient.get("/orders");
  return res.data;
};

export const createOrder = async (orderData: {
  coinId: string;
  pair: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  fullname: string;
  paymentMethod: string;
}) => {
  const res = await axiosClient.post("/orders", orderData);
  return res.data;
};

export const cancelOrder = async (id: string) => {
  const res = await axiosClient.patch(`/orders/${id}/cancel`);
  return res.data;
};
