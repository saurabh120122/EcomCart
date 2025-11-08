import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Helper function to unwrap the response data
const handleResponse = (res) => res.data.data;
// Helper function to handle errors
const handleError = (err) => {
  // Log the more specific error message from our backend
  console.error(err.response?.data?.message || err.message);
  throw err.response?.data?.message || err;
};

// Product API
export const getProducts = () => api.get('/products').then(handleResponse).catch(handleError);

// Cart API
export const getCart = () => api.get('/cart').then(handleResponse).catch(handleError);

export const updateCartQuantity = (product, quantity) =>
  api.post('/cart', { product, quantity }).then(handleResponse);

export const addToCart = (product) =>
  api.post('/cart', { product }).then(handleResponse).catch(handleError);

export const removeFromCart = (itemId) =>
  api.delete(`/cart/${itemId}`).then(handleResponse).catch(handleError);

// Checkout API
export const checkout = (cartItems, total) =>
  api.post('/checkout', { cartItems, total }).then(handleResponse).catch(handleError);