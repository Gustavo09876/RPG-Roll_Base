import { generateAccessToken, generateRefreshToken } from "../lib/jwt.js";
import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";

const { verify } = jwt;
const verifyAsync = promisify(verify);

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const oldRefreshToken = req.cookies["refresh-token"];
  console.log("Cookies recebidos:", req.cookies);
  console.log("Valor de refresh-token:", oldRefreshToken);

  try {
    if (!oldRefreshToken || oldRefreshToken.trim() === "") {
      return res.status(401).json({ error: "Refresh token não fornecido" });
    }

    const session = await prisma.session.findUnique({
      where: { refreshToken: oldRefreshToken },
    });

    if (!session || !session.valid || session.expiresAt < new Date()) {
      return res
        .status(403)
        .json({ error: "Refresh token inválido ou expirado" });
    }

    // Verifica validade do JWT do refresh token com async/await
    let decoded;
    try {
      decoded = await verifyAsync(
        oldRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return res.status(403).json({ error: "Refresh token inválido" });
    }

    const userId = decoded.userId;

    const accessToken = generateAccessToken({ userId });
    const newRefreshToken = generateRefreshToken({ userId });

    await prisma.session.update({
      where: { refreshToken: oldRefreshToken },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refresh-token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return res.json({ message: "Tokens renovados com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
