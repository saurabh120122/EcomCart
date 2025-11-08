import express from 'express';
import { mockCheckout } from '../controllers/checkoutController.js'; // <-- Note .js

const router = express.Router();

router.route('/').post(mockCheckout);

export default router;