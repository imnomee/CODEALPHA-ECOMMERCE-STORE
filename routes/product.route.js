import express from 'express';
import {
    getAllProducts,
    createNewProduct,
    deleteProduct,
    updateProduct,
} from '../controllers/product.controller.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.route('/').get(auth, getAllProducts).post(auth, createNewProduct);
router.route('/:id').delete(auth, deleteProduct).put(auth, updateProduct);
export default router;
