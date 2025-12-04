import React, { useState, } from 'react'
import { useauthstore } from '../../Auth/Authcontroller';
import {Link} from "react-router-dom"

const Login = () => {
  const { login } = useauthstore();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login?.(formData);
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handlesubmit} style={styles.form}>
        <h2 style={styles.title}>login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.field}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            type='email'
            name='email'
            value={formData.email}
            onChange={handlechange}
            placeholder='Enter your email'
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type='password'
            name='password'
            value={formData.password}
            onChange={handlechange}
            placeholder='Enter your password'
            style={styles.input}
            required
          />
        </div>

        <button type='submit' style={{ ...styles.button, ...(submitting ? styles.buttonDisabled : {}) }} disabled={submitting}>
          {submitting ? 'logging in…' : 'log in'}
        </button>
        <p>Don't have account? <Link to={"/signup"}>signup</Link></p>
      </form>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #eef2f3 0%, #d9e4ec 100%)',
    padding: '24px'
  },
  form: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    padding: '28px 24px',
    boxSizing: 'border-box'
  },
  title: {
    margin: 0,
    marginBottom: '18px',
    fontSize: '24px',
    fontWeight: 700,
    color: '#0f172a'
  },
  field: {
    marginBottom: '14px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    color: '#334155',
    fontWeight: 600
  },
  input: {
    width: '100%',
    padding: '12px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  button: {
    width: '100%',
    marginTop: '6px',
    padding: '12px 14px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.02s ease, background-color 0.2s ease',
  },
  buttonDisabled: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
    padding: '10px 12px',
    borderRadius: '8px',
    marginBottom: '12px',
    fontSize: '14px'
  }
}

export default Login
