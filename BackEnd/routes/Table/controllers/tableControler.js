// controllers/tableController.js
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();

export const getUserTables = async (req, res) => {
  console.log("Get Mesa");
  const userId = req.userId;

  try {
    const Tables = await prisma.userTable.findMany({
      where: { userId: userId },
      include: { table: true },
    });

    const result = Tables.map((entry) => ({
      ...entry.Table,
      role: entry.role,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar mesas" });
  }
};

export const createTable = async (req, res) => {
  const { name, description, sistema, ambientacao, dificuldade, jogadores } =
    req.body;

  if (!name || !sistema) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  const imagemUrl = req.file ? req.file.path : null;

  try {
    // Cria a mesa
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

    // Cria o userTable com isGm true
    console.log("ID do usuário recebido:", req.userId); // deve imprimir o UUID

    await prisma.userTable.create({
      data: {
        user: {
          connect: { id: req.userId },
        },
        table: {
          connect: { id: newTable.id },
        },
        role: "GM",
        isGm: true,
      },
    });

    // Retorna a mesa com os usuários ligados a ela
    const tableWithUsers = await prisma.table.findUnique({
      where: { id: newTable.id },
      include: {
        user_tables: true,
      },
    });

    res.status(201).json(tableWithUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar mesa" });
  }
};

export const updateTable = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: "id da mesa é obrigatório" });
  }

  try {
    // Verifica se o usuário tem permissão na mesa
    const userTable = await prisma.UserTable.findFirst({
      where: {
        user_id: userId,
        table_id: id,
      },
    });

    if (!userTable) {
      return res.status(403).json({ error: "Você não tem acesso a essa mesa" });
    }

    const updated = await prisma.table.update({
      where: { id },
      data: { name, description },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar mesa" });
  }
};
