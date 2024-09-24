import Product from '../models/prodcut.model.js'; // Import the Product model

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        // Check if products were found
        if (!products || products.length === 0) {
            // Check if the products array is empty
            return res.status(404).json({
                message: 'No Products Found', // Message if no products are found
                status: false,
            });
        }
        return res.status(200).json({
            status: true,
            products, // Return the found products
        });
    } catch (error) {
        console.log('GetAllProducts', error); // Log any error that occurs
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
            status: false,
        });
    }
};

// Create a new product
export const createNewProduct = async (req, res) => {
    try {
        const product = new Product(req.body); // Create a new product instance from the request body
        await product.save(); // Save the product to the database
        return res.status(201).json({
            success: true,
            product, // Return the newly created product
        });
    } catch (error) {
        console.log('createNewProduct', error); // Log any error that occurs
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
            success: false,
        });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id); // Delete product by ID
        // Check if the product was found and deleted
        if (!product) {
            return res.status(404).json({
                message: 'No Product found', // Message if no product is found
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Product Deleted', // Success message for deletion
            success: true,
            product, // Return the deleted product
        });
    } catch (error) {
        console.log('DeleteProduct', error); // Log any error that occurs
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
            success: false,
        });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated product
        );

        // Check if the product was found and updated
        if (!product) {
            return res.status(404).json({
                message: 'No Product found', // Message if no product is found
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Product Updated', // Success message for update
            success: true,
            product, // Return the updated product
        });
    } catch (error) {
        console.log('UpdateProduct', error); // Log any error that occurs
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
            success: false,
        });
    }
};
