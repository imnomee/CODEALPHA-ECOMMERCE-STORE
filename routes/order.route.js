import express from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.route('/').post(auth, createOrder);
router.route('/:userId').get(auth, getUserOrders);

export default router;
