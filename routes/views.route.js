import express from 'express';
import {
    getProducts,
    getSingleProduct,
    home,
    userLogin,
    userRegister,
} from '../controllers/views.controller.js';

const router = express.Router();

router.get('/', home);
router.get('/products', getProducts);
router.get('/products/:id', getSingleProduct);
router.get('/user/login', userLogin);
router.get('/user/register', userRegister);

export default router;
