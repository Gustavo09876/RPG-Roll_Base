import { PrismaClient } from "@prisma/client";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../config/jwt.js";

const prisma = new PrismaClient();

export const Refresh = async (oldRefreshToken) => {
  console.log("Old Refresh Token:", oldRefreshToken);
  if (!oldRefreshToken || oldRefreshToken.trim() === "") {
    throw new Error("Refresh token é obrigatório");
  }

  const session = await prisma.session.findUnique({
    where: { refreshToken: oldRefreshToken },
  });

  if (!session || !session.valid || session.expiresAt < new Date()) {
    throw new Error("Sessão inválida ou expirada");
  }

  const decoded = verifyRefreshToken(oldRefreshToken);

  const userId = decoded.userId; // depende de como você gerou o token

  const accessToken = generateAccessToken({ userId });
  const newRefreshToken = generateRefreshToken({ userId });

  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    message: "Tokens renovados com sucesso",
    accessToken,
    refreshToken: newRefreshToken,
  };
};
