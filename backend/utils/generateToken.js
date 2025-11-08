import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId }, // The data you want to store in the token
    process.env.JWT_SECRET, // Your secret key
    { expiresIn: '30d' } // Token expires in 30 days
  );

  // We are returning the token, but also setting it
  // in a cookie for web use
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  
  return token;
};

export default generateToken;