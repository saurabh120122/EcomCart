import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Read the token
  // We check for a bearer token in the Auth header
  // (The frontend will send this)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    throw new ApiError(401, 'Not authorized, no token');
  }

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Get the user from the token's ID
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }

    // 4. Move to the next function
    next();

  } catch (error) {
    console.error(error);
    throw new ApiError(401, 'Not authorized, token failed');
  }
});