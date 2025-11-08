import CartItem from '../models/CartItem.js';
// We no longer need the Product model
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc    Get all cart items
 * @route   GET /api/cart
 * @access  Public
 */
export const getCart = asyncHandler(async (req, res) => {
  // We no longer need to populate
  const cartItems = await CartItem.find({});

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
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Public
 */
export const addCartItem = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body; // <-- Receives product AND quantity

  if (!product) {
    throw new ApiError(400, 'Product data is required');
  }

  // --- THE FIX IS HERE ---

  // 1. Handle Remove (if quantity is 0 or less)
  if (quantity <= 0) {
    await CartItem.findOneAndDelete({ productId: product.id });
    return res.status(200).json(
      new ApiResponse(200, null, 'Item removed from cart')
    );
  }

  // 2. Handle Add/Update (if quantity is 1 or more)
  const itemData = {
    productId: product.id,
    quantity: quantity, // <-- It SETS the quantity to the number you sent
    name: product.title,
    price: product.price,
    image: product.image,
  };

  // Find and update, or create if it doesn't exist (upsert)
  const updatedItem = await CartItem.findOneAndUpdate(
    { productId: product.id }, // find a document with this filter
    itemData, // apply this update
    {
      new: true, // return the new version of the document
      upsert: true, // create a new doc if no match is found
    }
  );

  res.status(201).json(
    new ApiResponse(201, updatedItem, 'Cart updated')
  );
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/:id
 * @access  Public
 */
export const removeCartItem = asyncHandler(async (req, res) => {
  // This function doesn't need to change
  const cartItem = await CartItem.findById(req.params.id);

  if (!cartItem) {
    throw new ApiError(404, 'Cart item not found');
  }

  await cartItem.deleteOne();
  
  res.status(200).json(
    new ApiResponse(200, { id: req.params.id }, 'Item removed from cart')
  );
});