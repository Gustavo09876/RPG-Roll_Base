"use client";

import React, { useState, useRef } from "react";
import api from "../../Services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthButton } from "../../Components/Auth/AuthButton";
import { AuthCard } from "../../Components/Auth/AuthCard";
import { AuthContainer } from "../../Components/Auth/AuthContainer";
import { AuthDivider } from "../../Components/Auth/AuthDivider";
import { InputField } from "../../Components/Auth/AuthInputField";
import { GoogleSigninButton } from "../../Components/Auth/AuthGoogleSignInButton";
import { ErrorMessage } from "../../Components/Auth/AuthErrorMessage";

export default function RegisterPage() {
  const router = useRouter();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const password2InputRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState("");

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (
      nameInputRef.current?.value &&
      emailInputRef.current?.value &&
      passwordInputRef.current?.value &&
      password2InputRef.current?.value
    ) {
      const name = nameInputRef.current?.value;
      const email = emailInputRef.current?.value;
      const pass1 = passwordInputRef.current?.value;
      const pass2 = password2InputRef.current?.value;
      const emailReg = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );
      if (!name || name.trim().length < 2) {
        setFormError("O nome deve ter pelo menos 2 caracteres");
        return;
      }

      if (!emailReg.test(email)) {
        setFormError("E-mail inválido");
        return;
      }

      if (pass1.length < 8) {
        setFormError("A senha deve ter pelo menos 8 caracteres");
        return;
      }

      if (pass1 !== pass2) {
        setFormError("As senhas não coincidem");
        return;
      }

      const response = await api.get("/usuarios/verificar", {
        params: { email },
      });

      const { exists } = response.data;

      if (exists) {
        setFormError("Email já cadastrado");
      } else {
        await api.post("/usuarios/Register", {
          name,
          email,
          password1: pass1,
          password2: pass2,
        });
      }
      router.push("/Login");
    } else {
      setFormError("Preencha todos os campos");
    }
  }
  return (
    <AuthContainer>
      <AuthCard>
        <Link href="/Login" passHref>
          <div
            style={{
              textAlign: "left",
              marginBottom: 16,
              color: "#0f62fe",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            ← Voltar para o login
          </div>
        </Link>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: 0,
            marginBottom: 16,
            color: "#f5f5f5",
          }}
        >
          Crie sua conta
        </h2>
        {/* Botão Google */}
        <GoogleSigninButton />
        {/* Linha divisória */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
            color: "#aaa",
            fontSize: 13,
          }}
        >
          <div style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
          <AuthDivider />
          <div style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
        </div>
        {/* Inputs */}
        <form onSubmit={createUser}>
          <InputField type="text" placeholder="name" inputRef={nameInputRef} />
          <InputField
            type="email"
            placeholder="seu@email.com"
            inputRef={emailInputRef}
          />
          <InputField
            type="password"
            placeholder="Mín. 8 caracteres"
            inputRef={passwordInputRef}
          />
          <InputField
            type="password"
            placeholder="Confirmar senha"
            inputRef={password2InputRef}
            style={{ marginBottom: 24 }}
          />

          {formError && <ErrorMessage message={formError} />}

          <AuthButton type="submit" label="Criar conta" />
        </form>
      </AuthCard>
    </AuthContainer>
  );
}
