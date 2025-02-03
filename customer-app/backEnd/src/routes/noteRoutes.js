import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/noteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas protegidas para las notas
router.post('/notes', authMiddleware, createNote);
router.get('/notes', authMiddleware, getNotes);
router.put('/notes/:id', authMiddleware, updateNote);
router.delete('/notes/:id', authMiddleware, deleteNote);

export default router;