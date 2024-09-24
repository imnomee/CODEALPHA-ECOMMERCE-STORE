import mongoose from 'mongoose'; // Import Mongoose library

// Define the product schema
const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String, // Name of the product
            required: true, // Name is required
            unique: true, // Name must be unique
            minLength: [10, 'Name must be at least 10 characters long'], // Minimum length validation
            maxLength: [50, 'Name cannot exceed 50 characters'], // Maximum length validation
        },
        productDescn: {
            type: String, // Description of the product
            required: true, // Description is required
            minLength: [30, 'Description must be at least 30 characters long'], // Minimum length validation
            maxLength: [500, 'Description cannot exceed 500 characters'], // Maximum length validation
        },
        productPrice: {
            type: Number, // Price of the product
            required: true, // Price is required
            min: [1, 'Price must be greater than 1'], // Minimum price validation
        },
        productStock: {
            type: Number, // Stock quantity of the product
            required: true, // Stock is required
            min: [0, 'Stock cannot be negative'], // Minimum stock validation
        },
        productImage: {
            type: String, // URL or path to the product image
            required: true, // Image URL is required
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Export the Product model
export default mongoose.model('Product', productSchema);
