import Product from '../models/prodcut.model.js';

export const home = async (req, res, next) => {
    //get products
    const products = await Product.find();
    //build template
    //render template using the products
    return res.status(200).render('base', {
        title: 'Home',
        products,
    });
};

export const getProducts = (req, res) => {
    return res.status(200).render('products', {
        title: 'Products',
        user: 'Nomee',
    });
};
export const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    return res.status(200).render('product', {
        title: product.productName,
        product,
    });
};

export const userLogin = (req, res) => {
    return res.status(200).render('login', {
        title: 'User Login',
        user: 'Nomee',
    });
};

export const userRegister = (req, res) => {
    return res.status(200).render('register', {
        title: 'User Register',
        user: 'Nomee',
    });
};
export const productCart = (req, res) => {
    const userId = req.cookies.userId || '';
    return res.status(200).render('cart', {
        title: 'Product Cart',
        userId,
    });
};
