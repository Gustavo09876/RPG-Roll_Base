import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies["access-token"];
  console.log("Token recebido no cookie:", token);

  if (!token) {
    console.log("Autenticação falhou: token não encontrado.");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(
        "Autenticação falhou: token inválido ou expirado.",
        err.message
      );
      return res.sendStatus(403);
    }

    console.log("Payload do token:", payload.userId.userId);

    req.userId = payload.userId.userId;
    console.log("Autenticação bem sucedida. userId:", req.userId);

    next();
  });
}
