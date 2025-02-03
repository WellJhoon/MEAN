import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./src/routes/authRoutes.js";
import "dotenv/config";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();


app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});