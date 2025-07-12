import express from "express";

const app = express();

app.get("/usuarios", (req, res) => {
  res.send("deu bom!");
});

app.listen(3001);
