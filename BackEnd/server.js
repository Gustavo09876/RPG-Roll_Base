import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import usersRoutes from "./src/modules/user/user.routes.js";
import tableRoutes from "./src/modules/table/table.routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

app.use(express.json());
app.use(cookieParser());

// rotas
app.use("/users", usersRoutes);
app.use("/tables", tableRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
