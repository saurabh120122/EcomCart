import CartItem from '../models/CartItem.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc    Mock checkout for the logged-in user
 * @route   POST /api/checkout
 * @access  Private
 */
export const mockCheckout = asyncHandler(async (req, res) => {
  const { cartItems, total } = req.body;
  const userId = req.user._id;

  if (!cartItems || cartItems.length === 0 || !total) {
    throw new ApiError(400, 'Cart is empty or total is missing');
  }

  // 1. Clear ONLY the user's cart
  await CartItem.deleteMany({ user: userId });

  // 2. Create mock receipt 
  const receipt = {
    receiptId: `VIBE-${Date.now()}`,
    timestamp: new Date().toISOString(),
    items: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    total: total,
  };

  res.status(200).json(
    new ApiResponse(200, receipt, 'Checkout successful!')
  );
});