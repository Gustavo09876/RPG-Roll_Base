import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Buscar mesa por ID
export const getTableById = async (userId, id) => {
  const userTable = await prisma.userTable.findFirst({
    where: { userId, tableId: id },
  });

  if (!userTable) {
    throw new Error("Você não tem acesso a essa mesa");
  }

  const table = await prisma.table.findUnique({ where: { id } });
  if (!table) throw new Error("Mesa não encontrada");

  return table;
};
