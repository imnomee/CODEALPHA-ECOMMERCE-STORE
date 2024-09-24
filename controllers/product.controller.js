import Product from '../models/prodcut.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({
                message: 'No Products Found',
                status: false,
            });
        }
        return res.status(200).json({
            status: true,
            products,
        });
    } catch (error) {
        console.log('GetAllProducts', error);
    }
};

export const createNewProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        console.log('createNewProduct', error);
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: 'No Product found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Product Deleted',
            success: true,
            product,
        });
    } catch (error) {
        console.log('DeleteProduct', error);
    }
};
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: 'No Product found',
                success: false,
            });
        }
        return res.status(200).json({
            message: 'Product Updated',
            success: true,
            product,
        });
    } catch (error) {
        console.log('UpdateProduct', error);
    }
};
