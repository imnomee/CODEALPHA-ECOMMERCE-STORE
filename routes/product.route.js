import express from 'express';
import {
    getAllProducts,
    createNewProduct,
    deleteProduct,
    updateProduct,
} from '../controllers/product.controller.js';
const router = express.Router();

router.route('/').get(getAllProducts).post(createNewProduct);
router.route('/:id').delete(deleteProduct).put(updateProduct);
export default router;
