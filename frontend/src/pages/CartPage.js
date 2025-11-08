import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // <-- Import the hook
import { checkout } from '../api';
import ReceiptModal from '../components/ReceiptModal';

const CartPage = () => {
  // Get global cart state and functions
  const { cart, loading, updateQuantity, fetchCart } = useCart();
  
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email.');
      return;
    }
    
    try {
      const receiptData = await checkout(cart.items, cart.total);
      setReceipt(receiptData);
      setShowModal(true);
      setFormData({ name: '', email: '' });
      fetchCart(); // Refetch the (now empty) cart
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Checkout failed. Please try again.');
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.items.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
                  
                  {/* === QUANTITY CONTROLS === */}
                  <div className="quantity-control">
  <button onClick={() => {
    console.log('CLICK: Minus', item.quantity - 1);
    updateQuantity(item, item.quantity - 1);
  }}>
    -
  </button>
  
  <span>{item.quantity}</span>
  
  <button onClick={() => {
    console.log('CLICK: Plus', item.quantity + 1);
    updateQuantity(item, item.quantity + 1);
  }}>
    +
  </button>
</div>
                  {/* === END CONTROLS === */}
                </div>
                
                <button onClick={() => {
  console.log('CLICK: Remove', 0);
  updateQuantity(item, 0);
}} className="remove-btn">
  Remove
</button>
              </div>
            ))}
            {/* Make sure to handle 'cart.total' safely */}
            <h3>Total: ${Number(cart.total || 0).toFixed(2)}</h3>
          </div>

          <div className="checkout-form">
            <h3>Checkout</h3>
            <form onSubmit={handleCheckout}>
              {/* ... (form inputs are the same) ... */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="checkout-btn" disabled={cart.items.length === 0}>
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
      
      {showModal && receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CartPage;