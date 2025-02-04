import express from 'express';
import { getProducts, getProductsByCategory } from '../controllers/productController.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getProducts);

// Obtener productos por categoría
router.get('/category/:category', getProductsByCategory);

export default router;
