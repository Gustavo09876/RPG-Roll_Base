// table.routes.js
import express from "express";
import upload from "./middlewares/upload.js"; // Use o upload configurado
import {
  getUserTables,
  createTable,
  getTableById,
  updateTable,
} from "./table.controller.js";

const router = express.Router();

// Middleware de autenticação
import { authenticateToken } from "../../middleware/authMiddleware.js";

// Todas as rotas aqui exigem usuário autenticado
router.use(authenticateToken);

// Buscar todas as mesas do usuário
router.get("/", getUserTables);

// Criar nova mesa (com upload de imagem)
router.post("/", upload.fields([{ name: "imagem", maxCount: 1 }]), createTable);

// Buscar mesa específica por ID
router.get("/:id", getTableById);

// Atualizar mesa
router.put("/:id", updateTable);

export default router;
