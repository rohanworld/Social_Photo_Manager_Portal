import './Login.css';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      alert("User Logged In")
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to log in: ' + error.message);
    }
  }

  return (
    <div className="login-container">
      
      <h2>Log In</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form  className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Need an account? <Link  className="signup-link" to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;