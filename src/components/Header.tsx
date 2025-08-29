import React, { useEffect } from "react";
import { FaBitcoin, FaUser, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Header.module.css';
import { UserContext } from './UserContext';

interface UserContext {
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (userStr) setUser(JSON.parse(userStr));
    } catch (err) {
      console.error("Failed to parse user:", err);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null); 
    navigate('/');
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <button 
          className={styles.logoButton}
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <FaBitcoin className={styles.bitcoinLogo} />
          <span className={styles.logoText}>CryptoWorld</span>
        </button>

        {/* Navigation */}
        <nav className={styles.navLinks}>
          <button className={styles.navButton} onClick={() => navigate('/')}>Home</button>
          <button className={styles.navButton} onClick={() => navigate('/prices')}>Harga Crypto</button>
          <button className={styles.navButton} onClick={() => navigate('/news')}>Berita</button>
        </nav>

        {/* User Dropdown */}
        <div className={styles.authButtons}>
          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="user-dropdown">
                <FaUserCircle size={20} className="me-1" />
                {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/profile?tab=orders')}>Pesanan</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/profile?tab=assets')}>Aset</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/account')}>Akun</Dropdown.Item> 
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleLogout} className="text-danger">Keluar</Dropdown.Item>
              </Dropdown.Menu>

              {/* <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/account?tab=orders')}>Pesanan</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/account?tab=assets')}>Aset</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/orders')}>Pesanan</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/assets')}>Aset</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/account')}>Akun</Dropdown.Item> 
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">Keluar</Dropdown.Item>
              </Dropdown.Menu> */}
            </Dropdown>
          ) : (
            <>
              <Button variant="outline-primary" onClick={() => navigate('/login')} className="me-2">
                <FaUser className="me-1" /> Login
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                <FaUserPlus className="me-1" /> Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
