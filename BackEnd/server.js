import express from "express";
import cors from "cors";
import usersRoutes from "./routes/User/Users.js";
import login from "./routes/User/Login.js";
import register from "./routes/User/Register.js";
import refresh from "./routes/Refresh.js";
import tableRoutes from "./routes/Table/routes/tableRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/usuarios", usersRoutes);
app.use("/usuarios", login);
app.use("/usuarios", register);
app.use("/refresh", refresh);
app.use("/tables", tableRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
