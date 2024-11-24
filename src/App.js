
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './styles/cyber.css';

function App() {
    return (
      <Router>
      <div className="app-container">
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
      </div>
  </Router>
    );
}

export default App;