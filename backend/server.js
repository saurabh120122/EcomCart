import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';

// Import routes
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import userRoutes from './routes/userRoutes.js';
// Load env vars
dotenv.config();


const app = express();

// Body parser middleware
app.use(express.json());

// CORS middleware
app.use(cors());


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const startServer = async () => {
  try {
    // 1. Wait for DB
    await connectDB();
    console.log("Database connection established.");

    // 3. Start listening for requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();