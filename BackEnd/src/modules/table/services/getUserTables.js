import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Buscar mesas do usuário
export const getUserTables = async (userId) => {
  console.log("userId recebido:", userId);
  const Tables = await prisma.userTable.findMany({
    where: { userId },
    include: { table: true },
  });
  return Tables.map(({ table }) => table);
};
