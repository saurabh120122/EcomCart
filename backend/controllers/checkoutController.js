import CartItem from '../models/CartItem.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc    Mock checkout
 * @route   POST /api/checkout
 * @access  Public
 */
export const mockCheckout = asyncHandler(async (req, res) => {
  const { cartItems, total } = req.body;

  if (!cartItems || cartItems.length === 0 || !total) {
    throw new ApiError(400, 'Cart is empty or total is missing');
  }

  await CartItem.deleteMany({});

  const receipt = {
    receiptId: `VIBE-${Date.now()}`,
    timestamp: new Date().toISOString(),
    // We change 'item.product.name' to just 'item.name'
    items: cartItems.map(item => ({
      name: item.name, // <-- CHANGE
      quantity: item.quantity,
      price: item.price, // <-- CHANGE
    })),
    total: total,
  };

  res.status(200).json(
    new ApiResponse(200, receipt, 'Checkout successful!')
  );
});