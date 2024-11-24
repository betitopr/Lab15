import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/cyber.css';

function Dashboard() {
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/privado', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTimeout(() => {
                    setMensaje(response.data.mensaje);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <div className="terminal-button"></div>
                        <div className="terminal-button"></div>
                        <div className="terminal-button"></div>
                    </div>
                    <span>SECURE TERMINAL</span>
                </div>
                <div className="terminal-content">
                    {loading ? (
                        <>
                            <p className="loading-text"> Initializing secure session...</p>
                            <p className="loading-text"> Decrypting data...</p>
                            <p className="loading-text"> Establishing connection...</p>
                        </>
                    ) : (
                        <>
                            <p> Connection established</p>
                            <p> Access granted</p>
                            <p> Status: {mensaje}</p>
                            <p> System ready</p>
                        </>
                    )}
                </div>
            </div>
            <button onClick={handleLogout} className="cyber-button">
                TERMINATE SESSION
            </button>
        </div>
    );
}

export default Dashboard;