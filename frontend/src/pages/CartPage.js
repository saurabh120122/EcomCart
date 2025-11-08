import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import { checkout } from '../api';
import ReceiptModal from '../components/ReceiptModal';

const CartPage = () => {
  // Get global cart state and functions
  const { cart, loading, updateQuantity, fetchCart } = useCart();
  // Get the logged-in user's data
  const { user } = useAuth(); 
  
  
  const [receipt, setReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    
    try {
      const receiptData = await checkout(cart.items, cart.total);
      setReceipt(receiptData);
      setShowModal(true);
      fetchCart(); 
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
                  
                  {}
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  {}
                </div>
                
                <button onClick={() => updateQuantity(item, 0)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
            {/* Make sure to handle 'cart.total' safely */}
            <h3>Total: ${Number(cart.total || 0).toFixed(2)}</h3>
          </div>

          <div className="checkout-form">
            <h3>Checkout Details</h3>
            {/* Display user's info instead of a form */}
            <div className="checkout-user-details">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
            </div>
            <p className="checkout-note">
              Your order will be placed using these details.
            </p>
            <form onSubmit={handleCheckout}>
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