import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; 

  if (!name || !email || !password) { 
    throw new ApiError(400, 'Please provide name, email, and password');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    name, 
    email,
    password,
  });

  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json(new ApiResponse(201, {
      _id: user._id,
      name: user.name, 
      email: user.email,
      token: token,
    }, 'User registered successfully'));
  } else {
    throw new ApiError(500, 'Invalid user data');
  }
});

/**
 * @desc    Login user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Please provide email and password');
  }
  
  const user = await User.findOne({ email });

  // Check if user exists AND if password matches
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.status(200).json(new ApiResponse(200, {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    }, 'Login successful'));
  } else {
    throw new ApiError(401, 'Invalid email or password');
  }
});