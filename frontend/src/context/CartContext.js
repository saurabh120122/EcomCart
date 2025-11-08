import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, updateCartQuantity as apiUpdateQuantity } from '../api';
import { useAuth } from './AuthContext'; // <-- 1. IMPORT AUTH HOOK

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // <-- 2. GET THE USER

  const fetchCart = async () => {
    // 3. ONLY FETCH IF THE USER IS LOGGED IN
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData);
    } catch (err) {
      console.error('Error fetching cart:', err);
      // If we get a 401 error, it means our token is bad
      if (err.response?.status === 401) {
        // We'd ideally call logout() here, but that causes complexity.
        // For now, just clear the cart.
        setCart({ items: [], total: 0 });
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. RE-FETCH CART WHEN USER CHANGES (LOGIN)
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // 5. CLEAR CART IF USER LOGS OUT
      setCart({ items: [], total: 0 });
      setLoading(false);
    }
  }, [user]); // <-- Dependency on 'user'

  const updateQuantity = async (product, quantity) => {
    // 6. DON'T DO ANYTHING IF LOGGED OUT
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    
    // ... (rest of the function is the same)
    const productData = {
      id: product.id || product.productId,
      title: product.title || product.name,
      price: product.price,
      image: product.image,
    };
    
    try {
      await apiUpdateQuantity(productData, quantity);
      await fetchCart(); 
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

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

export const useCart = () => {
  return useContext(CartContext);
};