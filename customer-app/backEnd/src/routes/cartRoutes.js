import express from 'express';
import { getCart, addToCart } from '../controllers/cartController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

// Obtener el carrito del usuario (requiere autenticación)
router.get('/', authMiddleware, getCart);

// Agregar un producto al carrito (requiere autenticación)
router.post('/add', authMiddleware, addToCart);

export default router;
