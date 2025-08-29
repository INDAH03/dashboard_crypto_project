import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert, FormCheck } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { registerUser } from "../services/authAPI";

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const data = await registerUser(name, email, password);
    console.log("Register sukses:", data);
    navigate("/login"); 
  } catch (err: unknown) {
  const message =
    err instanceof Error ? err.message : "Register gagal";
  setError(message);
}
};
  return (
    <Container fluid className={styles.registerContainer}>
      <Card className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <h2 className={styles.registerTitle}>REGISTER</h2>
        </div>
        
        <Card.Body className={styles.registerBody}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className={styles.formLabel}>Full Name</Form.Label>
          <Form.Control
            className={styles.formControl}
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
        </Form.Group>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={styles.formLabel}>Email Address</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label className={styles.formLabel}>Confirm Password</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className={styles.rememberForgot}>
              <FormCheck
                type="checkbox"
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                id="rememberMe"
              />
              <Button variant="link" className="p-0">
                Forgot your password?
              </Button>
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className={`${styles.registerButton} w-100`}>
              REGISTER
            </Button>

            <div className={styles.welcomeText}>
              Have an account?   <span 
                className={styles.loginLink}
                onClick={() => navigate('/login')}>
                Login
              </span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;