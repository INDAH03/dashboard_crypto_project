import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import axiosClient from "../config/axiosClient";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

interface CheckoutForm {
  amount: string;
  paymentMethod: string;
}

const Checkout: React.FC = () => {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    amount: "",
    paymentMethod: "",
  });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fullname = user?.fullname || "Unknown";

useEffect(() => {
  axiosClient
    .get(`/crypto-prices/${coinId}`)
    .then((res) => {
      console.log("API response:", res.data); 
      setCoin(res.data);
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
}, [coinId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosClient.post("/orders", {
        coinId,
        pair: `${coin?.symbol}/USDT`,
        type: "buy", 
        amount: form.amount,
        price: coin?.price,
        fullname, 
        paymentMethod: form.paymentMethod,
      });

      navigate("/profile?tab=orders"); 
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Card className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
    <h3 className="mb-0">Checkout {coin?.name}</h3>
    <button className="btn btn-primary" onClick={() => navigate("/prices")}>
      &larr; Kembali
    </button>
  </div>

  <p>
    <strong>{coin?.name} ({coin?.symbol?.toUpperCase()})</strong>
  </p>
  <p>
    Harga Saat Ini: <strong>${coin?.price?.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
  </p>
  <p>Pair: {coin?.symbol?.toUpperCase()}/USDT</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Jumlah</Form.Label>
          <Form.Control
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Metode Pembayaran</Form.Label>
          <Form.Select
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
            required
          >
            <option value="">Pilih...</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="ewallet">E-Wallet</option>
            <option value="credit_card">Kartu Kredit</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex">
          <Button type="submit" variant="success" className="me-2">
            Konfirmasi
          </Button>

          <Button
            variant="danger"
            className="me-2"
            onClick={() => navigate("/prices")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Checkout;
