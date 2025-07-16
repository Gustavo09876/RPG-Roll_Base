// POST /usuarios/login
import { generateAccessToken, generateRefreshToken } from "../../lib/jwt.js";
import { addHours } from "date-fns";
import express from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // Buscar todas as sessões existentes do usuário
    const existingSessions = await prisma.session.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    // Se tiver 4 ou mais sessões, apaga a mais antiga
    if (existingSessions.length >= 4) {
      await prisma.session.delete({
        where: { id: existingSessions[0].id },
      });
    }

    // Criar a sessão temporária (sem refreshToken ainda)
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: "",
        valid: true,
        expiresAt: addHours(new Date(), 15),
      },
    });

    // Gerar tokens
    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ sessionId: session.id });

    // Atualizar a sessão com o refreshToken
    await prisma.session.update({
      where: { id: session.id },
      data: { refreshToken },
    });

    // Enviar cookies
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutos
      path: "/",
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 60 * 1000, // 15 horas
      path: "/refresh",
    });

    return res.json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
