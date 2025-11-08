import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext'; // <-- Make sure this is imported
import './App.css';

function App() {
  return (
    // The Provider MUST wrap everything that needs the cart
    <CartProvider> 
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-logo">Vibe Commerce</Link>
          <ul className="nav-links">
            <li><Link to="/">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            {/* These components are now children of CartProvider */}
            <Route path="/" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;