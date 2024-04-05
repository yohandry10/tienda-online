import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Log In</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          style={styles.input}
          required
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <div style={styles.signUp}>
        Need an account?{' '}
        <Link to="/signup" style={styles.signUpLink}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  error: {
    marginBottom: '20px',
    color: 'red',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  signUp: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#333',
  },
  signUpLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default SignIn;
