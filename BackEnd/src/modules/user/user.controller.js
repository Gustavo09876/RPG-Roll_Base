import * as userService from "./user.service.js";

// Refresh token
export const Refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
      return res.status(403).json({ error: "Refresh token não encontrado" });
    }

    // Validar o refresh token e gerar novo access token
    console.log("2");
    const refreshResult = await userService.Refresh(refreshToken);

    res.cookie("refresh-token", refreshResult.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.cookie("access-token", refreshResult.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "Access token renovado com sucesso" });
  } catch (err) {
    console.error("Erro no refresh token:", err);
    return res.status(401).json({ error: err.message || "Erro interno" });
  }
};

// Controller para login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await userService.loginUser({
      email,
      password,
    });

    // Aqui você seta os cookies
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({ message: "Login realizado com sucesso.", user });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(400).json({ error: err.message });
  }
};

// Controller para registro
export const register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro no registro:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const exists = await userService.checkEmailExists(email);
    return res.json({ exists });
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    return res.status(400).json({ error: error.message });
  }
};
