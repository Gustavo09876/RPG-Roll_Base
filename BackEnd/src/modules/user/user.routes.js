// user.routes.js
import express from "express";
import { login, register, verifyEmail } from "./user.controller.js";

const router = express.Router();

// Login
router.post("/login", login);

// Registro
router.post("/register", register);

// Verificar se o email existe
router.get("/email-existe", verifyEmail);

export default router;
