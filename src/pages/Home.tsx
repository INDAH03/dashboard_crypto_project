import React, { useContext } from "react";
import bitcoinLogo from "../assets/bitcoin.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import TopCoins from "../components/TopCoins";
import { UserContext } from "../components/UserContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isLoggedIn = !!user;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <img
            src={bitcoinLogo}
            alt="Bitcoin Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "200px", height: "auto" }}/>
          
          <h1 className="display-5 fw-bold">
            {isLoggedIn
              ? "Selamat Datang Kembali di CryptoWorld"
              : "Selamat Datang di CryptoWorld"}
          </h1>

          <p className="lead text-muted">
            {isLoggedIn
              ? "Yuk mulai trading sekarang dan pantau portofolio kamu!"
              : "Pelajari, investasikan, dan pantau mata uang digital secara aman dan terpercaya."}
          </p>

          {isLoggedIn ? (
            <button
              className="btn btn-success btn-lg mt-3"
              onClick={() => navigate("/trading")}
            >
              Trading Sekarang
            </button>
          ) : (
            <button
              className="btn btn-primary btn-lg mt-3"
              onClick={() => navigate("/register")}
            >
              Mulai Sekarang
            </button>
          )}
        </div>
      </section>

      {/* Bitcoin */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold mb-4">Apa itu Bitcoin?</h2>
            <p
              className="text-muted"
              style={{ textAlign: "justify", lineHeight: 1.7 }}
            >
              Bitcoin adalah mata uang digital terdesentralisasi yang memungkinkan
              transaksi peer-to-peer tanpa perantara seperti bank. Transaksi diverifikasi
              oleh jaringan node dan dicatat di blockchain publik.
              <br />
              <br />
              Diciptakan pada tahun 2009 oleh seseorang atau kelompok dengan nama
              samaran Satoshi Nakamoto, Bitcoin menjadi pelopor teknologi
              blockchain yang kini digunakan secara luas di berbagai sektor.
              <br />
              <br />
              Bitcoin sering digunakan sebagai aset investasi, penyimpan nilai, dan
              alat tukar.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src={bitcoinLogo}
              alt="Bitcoin Logo"
              className="img-fluid"
              style={{ maxWidth: "250px", height: "auto" }}
            />
          </div>
        </div>
      </section>
      
      {/* Top Coins */}
      <TopCoins />

      {/* Keunggulan */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Keunggulan Kami</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Keamanan Tinggi</h5>
                  <p className="card-text text-muted">
                    Transaksi terlindungi dengan enkripsi terbaik dan sistem blockchain.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Transaksi Cepat</h5>
                  <p className="card-text text-muted">
                    Proses transaksi instan tanpa perantara yang memperlambat.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Investasi Aman</h5>
                  <p className="card-text text-muted">
                    Memiliki potensi pertumbuhan jangka panjang dengan risiko terkontrol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>
    {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">&copy; 2025 CryptoWorld. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
 