import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Import auth hook

// Pages
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import protector

import './App.css';

function App() {
  const { user, logout } = useAuth(); // Get user and logout function

  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/" className="nav-logo">Vibe Commerce</Link>
        <ul className="nav-links">
          <li><Link to="/">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {user ? (
            <>
              <li><span>Welcome, {user.name}</span></li>
              <li><button onClick={logout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
      
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            {/* Add any other protected routes here, e.g. /profile, /checkout */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;