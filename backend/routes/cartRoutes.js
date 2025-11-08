import express from 'express';
import {
  getCart,
  upsertCartItem,
} from '../controllers/cartController.js'; 
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect,getCart).post(protect,upsertCartItem);

export default router;