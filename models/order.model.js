import mongoose from 'mongoose'; // Import Mongoose library

// Define the order schema
const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId, // Reference to the User model
            ref: 'User',
            required: true, // User ID is required
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.ObjectId, // Reference to the Product model
                    ref: 'Product',
                    required: true, // Product ID is required
                },
                quantity: {
                    type: Number, // Quantity of the product
                    required: true,
                    min: [1, 'Quantity must be at least 1.'], // Minimum quantity validation
                },
            },
        ],
        totalPrice: {
            type: Number, // Total price of the order
            required: true,
            min: [0, 'Total price must be a positive number.'], // Ensure total price is positive
        },
        status: {
            type: String, // Status of the order
            enum: ['pending', 'completed', 'shipped', 'rejected'], // Allowed status values
            default: 'pending', // Default status
        },
        orderDate: {
            type: Date,
            default: Date.now, // Set the current date and time as the default value
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Export the Order model
export default mongoose.model('Order', orderSchema);
