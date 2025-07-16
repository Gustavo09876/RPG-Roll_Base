import express from "express";
import { PrismaClient } from "../../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET /usuarios
router.get("/", async (req, res) => {
  try {
    const Users = await prisma.User.findMany();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /usuarios/verificar
router.get("/verificar", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }
    const usuarioExistente = await prisma.User.findUnique({ where: { email } });
    return res.status(200).json({ exists: !!usuarioExistente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /usuarios/:id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; // pegar o UUID direto

    // Opcional: validar se o id é um UUID válido antes de tentar deletar

    await prisma.User.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
