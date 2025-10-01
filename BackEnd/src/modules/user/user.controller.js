import * as userService from "./user.service.js";

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
      path: "/refresh",
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
