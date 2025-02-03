import Note from '../models/Note.js';

// Crear una nueva nota
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId; // Obtener el userId del token

  try {
    const note = new Note({ title, content, userId });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las notas del usuario
export const getNotes = async (req, res) => {
  const userId = req.userId; // Obtener el userId del token

  try {
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una nota
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una nota
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};