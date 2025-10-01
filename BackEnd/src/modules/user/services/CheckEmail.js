import { PrismaClient } from "../../../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const checkEmailExists = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return !!user;
};
