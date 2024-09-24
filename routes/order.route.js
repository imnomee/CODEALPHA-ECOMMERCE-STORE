import express from 'express';
import Product from '../models/prodcut.model.js';
import { createOrder, getUserOrders } from '../controllers/order.controller.js';

const router = express.Router();

router.route('/').post(createOrder);
router.route('/:userId').get(getUserOrders);
