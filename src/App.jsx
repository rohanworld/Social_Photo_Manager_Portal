import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
 

function App() {
  return (
    <div className="app-container">
      <div className="app-header">
        Social Photo Manager App
      </div>
    <div className="app-content">
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router> 

    </div>
      <div className="app-footer">
        MALLESH C N | Social Photo Manager Portal
      </div>
    </div>
  );
}

export default App;