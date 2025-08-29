import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CryptoPrices from "./pages/CryptoTable";
import CoinDetailPage from "./pages/CoinDetail";
import Login from './pages/Login'; 
import Register from './pages/Register';
import CryptoNews from "./pages/News";
import { UserProvider } from './components/UserProvider';
import UserDashboard from "./pages/UserDashboard";
import ProfilePage from "./pages/Profile";
import ProfileForm from "./pages/ProfileForm";
import Checkout from "./pages/Checkout";

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <div className="p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<CryptoPrices />} />
            <Route path="/coins/:id" element={<CoinDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/news" element={<CryptoNews />} />
            <Route path="/profile" element={<UserDashboard />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/update-account" element={<ProfileForm/>} />
            <Route path="/buy/:coinId" element={<Checkout />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
