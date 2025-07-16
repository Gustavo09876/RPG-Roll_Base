// controllers/tableController.js
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();

export const getUserTables = async (req, res) => {
  const userId = req.userId;

  try {
    const tables = await prisma.userTable.findMany({
      where: { user_id: userId },
      include: { table: true },
    });

    const result = tables.map((entry) => ({
      ...entry.table,
      role: entry.role,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar mesas" });
  }
};

export const createTable = async (req, res) => {
  const userId = req.userId;
  const {
    name,
    description,
    sistema,
    ambientacao,
    dificuldade,
    jogadores,
    role,
  } = req.body;

  if (!name || !sistema) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  const imagemUrl = req.file ? req.file.path : null;

  try {
    const newTable = await prisma.table.create({
      data: {
        titulo: name,
        description,
        sistema,
        ambientacao,
        dificuldade,
        jogadores,
        imagemUrl,
        status: "ATIVA", // ou outro valor padrão
        mestreId: userId,
        user_tables: {
          create: {
            user_id: userId,
            role: role || "GM",
          },
        },
      },
    });

    res.status(201).json(newTable);
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
    const userTable = await prisma.userTable.findFirst({
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
