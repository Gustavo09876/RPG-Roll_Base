import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { addHours } from "date-fns";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../config/jwt.js";

const prisma = new PrismaClient();

/**
 * Login de usuário (service puro)
 */
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha incorreta.");
  }

  // Buscar sessões existentes
  const existingSessions = await prisma.session.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  // Limitar 4 sessões por usuário
  if (existingSessions.length >= 4) {
    await prisma.session.delete({ where: { id: existingSessions[0].id } });
  }

  // Criar sessão temporária
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

  // Atualizar refreshToken na sessão
  await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken },
  });

  // Retornar os dados para o controller
  return { user, accessToken, refreshToken };
};
