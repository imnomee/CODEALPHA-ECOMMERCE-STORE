// Import necessary modules
import express from 'express'; // Import the Express framework
import {
    getAllProducts, // Controller to get all products
    createNewProduct, // Controller to create a new product
    deleteProduct, // Controller to delete a product
    updateProduct, // Controller to update a product
} from '../controllers/product.controller.js'; // Import controllers from the specified path
import auth from '../middlewares/auth.js'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Define routes for product management
// Route for getting all products and creating a new product
router
    .route('/')
    .get(auth, getAllProducts) // GET request to fetch all products, requires authentication
    .post(auth, createNewProduct); // POST request to create a new product, requires authentication

// Route for deleting and updating a product by ID
router
    .route('/:id')
    .delete(auth, deleteProduct) // DELETE request to remove a product by ID, requires authentication
    .put(auth, updateProduct); // PUT request to update a product by ID, requires authentication

// Export the router for use in other parts of the application
export default router;
