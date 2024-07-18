import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setLoginError(error.message);
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Welcome to</h1>
        <img style={{ marginLeft: '60px', marginBottom: '20px', width: '150px', height: '150px' }} src={Logo} alt="OLX Logo" />
        <p style={{ color: 'red' }}>{loginError}</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <a style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
