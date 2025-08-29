import React, { useEffect, useState } from "react";
import { getCryptoPrices } from "../services/CryptoAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
};

const CryptoTable: React.FC = () => {
  const [data, setData] = useState<Coin[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      getCryptoPrices()
        .then(setData)
        .catch((err) => setError(err.message));
    };

    fetchData(); 
    const interval = setInterval(fetchData, 30000); 

    return () => clearInterval(interval); 
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">Crypto Prices</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Coin</th>
              <th>Price (USD)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin) => (
              <tr key={coin.id}>
                <td>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </td>
                <td>
                  ${coin.current_price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                <div className="d-flex gap-2 justify-content-center">
                  {/* <button
                    className="btn btn-success btn-sm"
                    onClick={() => navigate(`/buy/${coin.id}`)}
                  >
                    Buy
                  </button> */}
                  <button
                  className="btn btn-success btn-sm"
                  onClick={() => navigate(`/buy/${coin.id}`)}>
                  Buy
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/coins/${coin.id}`)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;

   