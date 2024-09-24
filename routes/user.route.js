import express from 'express'; // Import the Express library
import { registerUser, loginUser } from '../controllers/user.controller.js'; // Import user controller functions

const router = express.Router(); // Create a new router instance

// Route for user registration
router.route('/register').post(registerUser); // POST request to /api/user/register to create a new user

// Route for user login
router.route('/login').post(loginUser); // POST request to /api/user/login to authenticate a user

export default router; // Export the router for use in the main application
