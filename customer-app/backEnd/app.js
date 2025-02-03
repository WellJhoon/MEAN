import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./src/routes/authRoutes.js";
import "dotenv/config";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api/auth", authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});