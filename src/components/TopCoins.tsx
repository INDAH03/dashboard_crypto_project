import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getTopCoins } from "../services/CryptoAPI"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const TopCoins: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [coinCharts, setCoinCharts] = useState<Record<string, number[]>>({});

useEffect(() => {
  const fetchCoins = async () => {
    try {
      const data = await getTopCoins();
      setCoins(data.coins);
      setCoinCharts(data.charts);
    } catch (err) {
      console.error("Failed to fetch top coins", err);
    }
  };
  fetchCoins();
}, []);

  return (
    <section className="container my-5">
      <h2 className="text-center fw-bold mb-5">Top Bitcoin & Crypto</h2>
      <div className="row">
        {coins.map((coin) => (
          <div key={coin.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{ width: "50px", height: "50px" }}
                />
                <h5 className="card-title mt-2">{coin.name}</h5>
                <p
                  className={`text-${
                    coin.price_change_percentage_24h >= 0 ? "success" : "danger"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                {coinCharts[coin.id] ? (
                  <Line
                    data={{
                      labels: ["6d ago", "5d ago", "4d ago", "3d ago", "2d ago", "1d ago", "Now"],
                      datasets: [
                        {
                          label: coin.symbol.toUpperCase(),
                          data: coinCharts[coin.id],
                          borderColor: "rgba(75,192,192,1)",
                          backgroundColor: "rgba(75,192,192,0.2)",
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                    }}
                  />
                ) : (
                  <p>Loading chart...</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCoins;
