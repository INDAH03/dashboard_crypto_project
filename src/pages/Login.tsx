import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { loginUser } from "../services/authAPI";
import { AxiosError } from "axios";
import { UserContext } from '../components/UserContext'; 
import type { UserContextType } from '../components/UserContext'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext) as UserContextType;

  const validateForm = () => {
    if (!email) { setError('Email harus diisi'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Email tidak valid'); return false; }
    if (!password) { setError('Password harus diisi'); return false; }
    if (password.length < 6) { setError('Password minimal 6 karakter'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const data = await loginUser(email, password);

    if (rememberMe) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
    } else {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
    }

    setUser({ name: data.name, email: data.email });
    navigate("/"); 

    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Login gagal. Email atau password salah");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2 className={styles.loginTitle}>LOGIN</h2>
        </div>
        
        <div className={styles.loginBody}>
          {error && (
            <div className={styles.errorAlert}>
              {error}
              <button onClick={() => setError('')} className={styles.closeButton}>×</button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input
                id="email"
                type="email"
                className={styles.formControl}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Password</label>
              <input
                id="password"
                type="password"
                className={styles.formControl}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.rememberForgot}>
              <div className={styles.rememberMe}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className={styles.forgotLink}>Forgot your password?</a>
            </div>

            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinnerContainer}>
                  <span className={styles.spinner}></span>
                  Loading...
                </span>
              ) : 'LOGIN'}
            </button>

            <div className={styles.divider}></div>

            <p className={styles.registerPrompt}>
              Don't have an account?{' '}
              <span 
                className={styles.registerLink}
                onClick={() => navigate('/register')}
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
