import express from 'express';
import { createOrder, getOrderHistory } from '../controllers/orderController.js';
import authMiddleware from '../Middleware/authMiddleware.js ';

const router = express.Router();

// Crear una orden desde el carrito (requiere autenticación)
router.post('/create', authMiddleware, createOrder);

// Obtener el historial de órdenes del usuario (requiere autenticación)
router.get('/history', authMiddleware, getOrderHistory);

export default router;
