import express from 'express';
import {
  getCart,
  addCartItem,
  removeCartItem,
} from '../controllers/cartController.js'; // <-- Note .js

const router = express.Router();

router.route('/').get(getCart).post(addCartItem);
router.route('/:id').delete(removeCartItem);

export default router;