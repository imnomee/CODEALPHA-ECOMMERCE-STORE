import Product from '../models/prodcut.model.js'; // Import the Product model
import Order from '../models/order.model.js'; // Import the Order model

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body; // Destructure userId and products from the request body

        // Calculate total price
        let totalPrice = 0;
        const productDetails = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.product); // Find product by ID
                // Check if the product exists
                if (!product) {
                    return res.status(404).json({
                        message: 'Product Not Found',
                        status: false,
                    });
                }
                // Check if there is enough stock
                if (product.stock < item.quantity) {
                    return res.status(400).json({
                        message: 'Not enough stock',
                        status: false,
                    });
                }

                // Update total price
                totalPrice += product.productPrice * item.quantity;

                // Update product stock
                product.stock -= item.quantity; // Decrease stock by ordered quantity
                await product.save(); // Save updated product
                return {
                    product: product._id, // Return product ID and quantity
                    quantity: item.quantity,
                };
            })
        );

        // Create a new order
        const order = new Order({
            userId,
            products: productDetails,
            totalPrice,
        });

        await order.save(); // Save the new order to the database
        return res.status(201).json({
            message: 'Order Created',
            status: true,
            order, // Return the created order
        });
    } catch (error) {
        console.log('CreateOrder', error.message); // Log any error that occurs
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
            status: false,
        });
    }
};

// Get all orders for a specific user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters
        const orders = await Order.find({ userId }).populate(
            'products.product'
        ); // Find orders by userId and populate product details

        // Check if any orders were found
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                message: 'No orders found',
                status: false,
            });
        }
        return res.status(200).json({
            status: true,
            orders, // Return found orders
        });
    } catch (error) {
        console.log('GetUserOrders', error); // Log any error that occurs
        return res.status(500).json({
            // Return a server error response
            message: 'Server Error',
            status: false,
        });
    }
};
