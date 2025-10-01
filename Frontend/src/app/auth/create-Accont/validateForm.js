export function validateForm(name, email, pass1, pass2) {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.trim().length < 2) {
    return "O nome deve ter pelo menos 2 caracteres";
  }

  if (!emailReg.test(email)) {
    return "E-mail inválido";
  }

  if (pass1.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres";
  }

  if (pass1 !== pass2) {
    return "As senhas não coincidem";
  }

  return "";
}
