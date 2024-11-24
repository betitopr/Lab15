import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/cyber.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            localStorage.setItem('token', response.data.access);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (error) {
            alert('Access Denied: Invalid Credentials');
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">SECURE ACCESS</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="cyber-button" disabled={loading}>
                        {loading ? 'AUTHENTICATING...' : 'INITIALIZE ACCESS'}
                    </button>
                </form>
                {loading && (
                    <p className="loading-text">
                         Establishing secure connection...
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;