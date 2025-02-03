import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Registrar un nuevo usuario
const register = async (req, res) => {
  const {
    username,
    password,
    nombre,
    apellido,
    foto,
    numero,
    direccion,
    fechaNacimiento,
  } = req.body;

  try {
    const user = new User({
      username,
      password,
      nombre,
      apellido,
      foto,
      numero,
      direccion,
      fechaNacimiento,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Iniciar sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      _id: user._id,
      username: user.username,
      nombre: user.nombre,
      apellido: user.apellido,
      foto: user.foto,
      numero: user.numero,
      direccion: user.direccion,
      fechaNacimiento: user.fechaNacimiento,
    };

    res.json({ token, user: userData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login };
