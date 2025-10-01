import * as tableService from "./table.service.js";

// Buscar mesas de um usuário
export const getUserTables = async (req, res) => {
  try {
    const userId = req.userId;
    const tables = await tableService.getUserTables(userId);
    return res.json(tables);
  } catch (error) {
    console.error("Erro ao buscar mesas:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Criar mesa
export const createTable = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await tableService.createTable(req, userId);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar mesa:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Buscar mesa por ID
export const getTableById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const table = await tableService.getTableById(userId, id);
    return res.json(table);
  } catch (error) {
    console.error("Erro ao buscar mesa:", error);
    return res.status(400).json({ error: error.message });
  }
};

// Atualizar mesa
export const updateTable = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    console.log("ID recebido no controller:", id);
    console.log("Corpo da requisição:", req.body);
    const result = await tableService.updateTable(req, userId, id);
    return res.json(result);
  } catch (error) {
    console.error("Erro ao atualizar mesa:", error);
    return res.status(400).json({ error: error.message });
  }
};
