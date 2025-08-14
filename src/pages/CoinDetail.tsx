import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCryptoDetail } from "../services/CryptoAPI";
import "bootstrap/dist/css/bootstrap.min.css";

type CoinDetail = {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
  };
  image: { large: string };
};

const CoinDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCryptoDetail(id)
      .then((data) => {
        setCoinDetail(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center my-5">Loading coin detail...</p>;
  if (error) return <p className="text-center text-danger my-5">{error}</p>;
  if (!coinDetail) return <p className="text-center my-5">No detail found.</p>;

  const priceChangeColor =
  coinDetail.market_data.price_change_percentage_24h > 0 ? "text-success" : "text-danger";

  return (
    
  <div className="container my-5">
  <button 
    className="btn btn-primary mb-4" 
    onClick={() => navigate("/")}
  >
    &larr; Kembali ke daftar
  </button>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <img
              src={coinDetail.image.large}
              alt={`${coinDetail.name} logo`}
              className="me-3"
              style={{ width: 80, height: 80 }}
            />
            <h1 className="card-title mb-0">
              {coinDetail.name} ({coinDetail.symbol.toUpperCase()})
            </h1>
          </div>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Current Price</th>
                <td>${coinDetail.market_data.current_price.usd.toLocaleString()}</td>
              </tr>
              <tr>
                <th scope="row">Market Cap</th>
                <td>${coinDetail.market_data.market_cap.usd.toLocaleString()}</td>
              </tr>
              <tr>
                <th scope="row">24h Price Change</th>
                <td className={priceChangeColor}>
                  {coinDetail.market_data.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>

          <section className="mt-4">
            <h2 className="h5 mb-2">Description</h2>
            <div className="text-justify" style={{ lineHeight: 1.6 }}>
              {coinDetail.description.en ? (
                <p dangerouslySetInnerHTML={{ __html: coinDetail.description.en }} />
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailPage;
