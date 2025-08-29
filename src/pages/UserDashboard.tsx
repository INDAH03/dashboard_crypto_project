import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table, Button, Card, Spinner } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Order {
  id: number;
  pair: string;
  type: string;
  amount: string;
  price: string;
  status: string;
}

interface Asset {
  coin: string;
  balance: number;
  value: string;
}

const UserDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [key, setKey] = useState<string>(searchParams.get("tab") || "orders");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (key === "orders") {
      fetch("http://localhost:5000/api/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else if (key === "assets") {
      fetch("http://localhost:5000/api/assets")
        .then((res) => res.json())
        .then((data) => setAssets(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [key]);

  if (loading) return <Spinner animation="border" />;

  return (
    <Card>
      <Tabs
        id="user-dashboard"
        activeKey={key}
        onSelect={(k: string | null) => {
          if (k) {
            setKey(k);
            navigate(`/profile?tab=${k}`);
          }
        }}
        className="mb-3"
      >
        {/* Orders */}
        <Tab eventKey="orders" title="Pesanan">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pair</th>
                <th>Tipe</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: Order) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.pair}</td>
                  <td>{o.type}</td>
                  <td>{o.amount}</td>
                  <td>{o.price}</td>
                  <td>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Assets */}
        <Tab eventKey="assets" title="Aset">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Koin</th>
                <th>Saldo</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a: Asset, idx: number) => (
                <tr key={idx}>
                  <td>{a.coin}</td>
                  <td>{a.balance}</td>
                  <td>{a.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-2">
            <Button variant="success" className="me-2">
              Deposit
            </Button>
            <Button variant="danger">Withdraw</Button>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
};

export default UserDashboard;
