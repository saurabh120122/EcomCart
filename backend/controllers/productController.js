import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import axios from 'axios'; // <-- IMPORT

/**
 * @desc    Get all products from Fake Store API
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  
  // Note: We use data, not data.data, as it's not our own API
  res.status(200).json(
    new ApiResponse(200, data, 'Products fetched successfully')
  );
});