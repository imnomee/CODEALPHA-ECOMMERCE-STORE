import express from 'express'; // Import Express library
import { createOrder, getUserOrders } from '../controllers/order.controller.js'; // Import order controller functions
import auth from '../middlewares/auth.js'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Route to create a new order
router.route('/').post(auth, createOrder); // POST request to /api/order to create an order with authentication

// Route to get orders for a specific user
router.route('/:userId').get(auth, getUserOrders); // GET request to /api/order/:userId to fetch user's orders with authentication

export default router; // Export the router for use in the main application
