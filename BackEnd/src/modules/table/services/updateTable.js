import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Criar mesa
export const updateTable = async (req, userId, id) => {
  const { name, description, sistema, ambientacao, dificuldade, jogadores } =
    req.body;

  if (!name || !sistema) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  const imagemFile =
    req.files && req.files["imagem"] ? req.files["imagem"][0] : null;
  const imagemUrl = imagemFile ? `uploads/${imagemFile.filename}` : null;

  const updatedTable = await prisma.table.update({
    where: { id: id },
    data: {
      titulo: name,
      description,
      sistema,
      ambientacao,
      dificuldade,
      jogadores,
      status: "ATIVA",
      // Só atualiza a imagem se tiver uma nova
      ...(imagemUrl ? { imagemUrl } : {}),
    },
  });
};
