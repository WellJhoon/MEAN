import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../Middleware/authMiddleware.js";


const router = express.Router();


router.post("/register", register);


router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

export default router;