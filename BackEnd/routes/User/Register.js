// POST /usuarios/cadastro
import bcrypt from "bcryptjs";
import express from "express";
import { PrismaClient } from "../../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  const { name, email, password1, password2 } = req.body;

  if (!name || !email || !password1 || !password2) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const emailReg = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
        "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );

    if (!emailReg.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const usuarioExistente = await prisma.User.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ error: "Usuário já cadastrado com esse email" });
    }

    if (password1.length < 8 || password2.length < 8) {
      return res
        .status(400)
        .json({ error: "A senha deve ter pelo menos 8 caracteres" });
    }

    if (password1 !== password2) {
      return res.status(400).json({ error: "As senhas não coincidem" });
    }

    const hash = await bcrypt.hash(password1, 12);
    const User = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", UserId: User.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
