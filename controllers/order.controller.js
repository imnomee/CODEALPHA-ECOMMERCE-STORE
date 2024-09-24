export const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;

        //calculate total price
        let totalPrice = 0;
        const productDetails = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(404).json({
                        message: 'Product Not Found',
                        status: false,
                    });
                }
                if (product.stock < item.quantity) {
                    return res.status(400).json({
                        message: 'Not enough stock',
                        status: false,
                    });
                }

                //update total Price
                totalPrice += product.price * item.quantity;

                //update product stock
                product.stock -= item.quantity;
                await product.save();
                return {
                    product: product._id,
                    quantity: item.quantity,
                };
            })
        );
        const order = new Order({
            user: userId,
            products: productDetails,
            totalPrice,
        });

        await order.save();
        return res.status(201).json({
            message: 'Order Created',
            status: true,
        });
    } catch (error) {
        console.log('CreateOrder', error);
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ user: userId }).populate(
            'products.product'
        );
        if (!orders) {
            return res.status(404).json({
                message: 'No orders found ',
                status: false,
            });
        }
        return res.status(200).json({
            status: true,
            orders,
        });
    } catch (error) {
        console.log('GetUserOrders', error);
    }
};
