import React from 'react';
import './ReceiptModal.css'; // We'll create this CSS file

const ReceiptModal = ({ receipt, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Checkout Successful!</h2>
        <p>Thank you for your order.</p>
        <div className="receipt-details">
          <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
          <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <h4>Items:</h4>
          <ul>
            {receipt.items.map((item, index) => (
              <li key={index}>
                {item.name} (Qty: {item.quantity}) - ${item.price.toFixed(2)} each
              </li>
            ))}
          </ul>
          <h3 className="receipt-total">Total: ${receipt.total}</h3>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;