import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Atualizar mesa
export const updateTable = async (userId, id, data) => {
  const userTable = await prisma.userTable.findFirst({
    where: { userId, tableId: id },
  });

  if (!userTable) {
    throw new Error("Você não tem acesso a essa mesa");
  }

  return prisma.table.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
    },
  });
};
