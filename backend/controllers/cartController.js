import CartItem from '../models/CartItem.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// (getProducts function is no longer here, it's in productController)

/**
 * @desc    Get the logged-in user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = asyncHandler(async (req, res) => {
  // Find cart items matching the user's ID
  const cartItems = await CartItem.find({ user: req.user._id });

  const total = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const cartData = {
    items: cartItems,
    total: total,
  };

  res.status(200).json(
    new ApiResponse(200, cartData, 'Cart fetched successfully')
  );
});

/**
 * @desc    Add, update, or remove item from the user's cart
 * @route   POST /api/cart
 * @access  Private
 */
export const upsertCartItem = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;
  const userId = req.user._id; // Get user ID from our middleware

  if (!product) {
    throw new ApiError(400, 'Product data is required');
  }

  // Handle Remove (quantity 0 or less)
  if (quantity <= 0) {
    await CartItem.findOneAndDelete({ 
      user: userId, // Match user
      productId: product.id 
    });
    return res.status(200).json(
      new ApiResponse(200, null, 'Item removed from cart')
    );
  }

  // Handle Add/Update
  const itemData = {
    user: userId, // Set user
    productId: product.id,
    quantity: quantity,
    name: product.title,
    price: product.price,
    image: product.image,
  };

  const updatedItem = await CartItem.findOneAndUpdate(
    { user: userId, productId: product.id }, // find a doc with this filter
    itemData, // apply this update
    { new: true, upsert: true }
  );

  res.status(201).json(
    new ApiResponse(201, updatedItem, 'Cart updated')
  );
});