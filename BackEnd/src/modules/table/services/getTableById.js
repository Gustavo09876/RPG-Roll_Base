import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Buscar mesa por ID
export const getTableById = async (userId, id) => {
  const table = await prisma.table.findFirst({
    where: {
      id,
      user_tables: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      user_tables: true,
    },
  });

  if (!table) {
    throw new Error("Você não tem acesso a essa mesa ou ela não existe");
  }

  return table;
};
