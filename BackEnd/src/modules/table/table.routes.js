// table.routes.js
import express from "express";
import multer from "multer";
const upload = multer();

import {
  getUserTables,
  createTable,
  getTableById,
  updateTable,
} from "./table.controller.js";

const router = express.Router();

// Middleware de autenticação (supondo que você já tenha um)
import { authenticateToken } from "../../middleware/authMiddleware.js";

// Todas as rotas aqui exigem usuário autenticado
router.use(authenticateToken);

// Buscar todas as mesas do usuário
router.get("/", getUserTables);

// Criar nova mesa
router.post("/", upload.any(), createTable);

// Buscar mesa específica por ID
router.get("/:id", getTableById);

// Atualizar mesa
router.put("/:id", updateTable);

export default router;
