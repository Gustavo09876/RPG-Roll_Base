import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Registrar novo usuário
 */
export const registerUser = async ({ name, email, password1, password2 }) => {
  if (!name || !email || !password1 || !password2) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const emailReg = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
      "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );

  if (!emailReg.test(email)) {
    throw new Error("E-mail inválido.");
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new Error("Já existe um usuário cadastrado com este e-mail.");
  }

  if (password1.length < 8 || password2.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres.");
  }

  if (password1 !== password2) {
    throw new Error("As senhas não coincidem.");
  }

  const hash = await bcrypt.hash(password1, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
    },
  });

  return { message: "Usuário criado com sucesso.", userId: user.id };
};
