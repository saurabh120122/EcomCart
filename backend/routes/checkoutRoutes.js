import express from 'express';
import { mockCheckout } from '../controllers/checkoutController.js'; // <-- Note .js
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect,mockCheckout);

export default router;