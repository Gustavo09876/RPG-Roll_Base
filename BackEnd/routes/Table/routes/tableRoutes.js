import express from "express";
import multer from "multer";
import {
  getUserTables,
  createTable,
  updateTable,
} from "../controllers/tableControler.js";
import { authenticateToken } from "../../../auth.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/mesas", authenticateToken, getUserTables);
router.post(
  "/mesas",
  authenticateToken,
  upload.fields([{ name: "imagem", maxCount: 1 }]),
  createTable
);
router.put("/mesas/:id", authenticateToken, updateTable);

export default router;
