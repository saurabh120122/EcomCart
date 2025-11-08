import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, updateCartQuantity } from '../api'; // Check your api.js import

// 1. Create the context
const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch initial cart on load
  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCart({ items: [], total: 0 }); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Function to update quantity (adds, removes, or updates)
  const updateQuantity = async (product, quantity) => {
    // This 'productData' object is crucial.
    // It normalizes the product from ProductPage (product.id)
    // and CartPage (product.productId) so the backend gets a consistent object.
    const productData = {
      id: product.id || product.productId,
      title: product.title || product.name,
      price: product.price,
      image: product.image,
    };
    
    try {
      // This function sends the productData and the NEW target quantity
      await updateCartQuantity(productData, quantity);
      
      // After the backend is updated, we fetch the fresh cart state
      await fetchCart(); 
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  // Helper to get quantity for a specific item
  const getCartItemQuantity = (productId) => {
    const item = cart.items.find((i) => i.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        loading, 
        fetchCart, 
        updateQuantity, 
        getCartItemQuantity 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3. Create a custom hook to use the context easily
export const useCart = () => {
  return useContext(CartContext);
};