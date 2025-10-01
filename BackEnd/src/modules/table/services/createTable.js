import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Criar mesa
export const createTable = async (req, userId) => {
  const { name, description, sistema, ambientacao, dificuldade, jogadores } =
    req.body;

  if (!name || !sistema) {
    throw new Error("Campos obrigatórios ausentes.");
  }

  const imagemFile =
    req.files && req.files["imagem"] ? req.files["imagem"][0] : null;
  const imagemUrl = imagemFile ? `uploads/${imagemFile.filename}` : null;

  const newTable = await prisma.table.create({
    data: {
      titulo: name,
      description,
      sistema,
      ambientacao,
      dificuldade,
      jogadores,
      imagemUrl,
      status: "ATIVA",
    },
  });

  await prisma.userTable.create({
    data: {
      user: { connect: { id: userId } },
      table: { connect: { id: newTable.id } },
      role: "GM",
      isGm: true,
    },
  });

  return prisma.table.findUnique({
    where: { id: newTable.id },
    include: { user_tables: true },
  });
};
