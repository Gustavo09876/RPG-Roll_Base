"use client";

import React, { useState, useRef } from "react";
import api from "@/Services/api";
import Link from "next/link";
import { validateForm } from "./validateForm";
import { useRouter } from "next/navigation";
import { AuthButton } from "../../../Components/Auth/AuthButton";
import { AuthCard } from "../../../Components/Auth/AuthCard";
import { AuthContainer } from "../../../Components/Auth/AuthContainer";
import { AuthDivider } from "../../../Components/Auth/AuthDivider";
import { InputField } from "../../../Components/Auth/AuthInputField";
import { GoogleSigninButton } from "../../../Components/Auth/AuthGoogleSignInButton";
import { ErrorMessage } from "../../../Components/Auth/AuthErrorMessage";

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

    const name = nameInputRef.current?.value || "";
    const email = emailInputRef.current?.value || "";
    const pass1 = passwordInputRef.current?.value || "";
    const pass2 = password2InputRef.current?.value || "";

    // Validação usando função externa
    const error = validateForm(name, email, pass1, pass2);
    if (error) {
      setFormError(error);
      return;
    }

    try {
      const response = await api.get("/users/verifyEmail", {
        params: { email },
      });

      const { exists } = response.data;

      if (exists) {
        setFormError("Email já cadastrado");
        return;
      }

      await api.post("/users/register", {
        name,
        email,
        password1: pass1,
        password2: pass2,
      });

      router.push("/auth/login");
    } catch (err) {
      setFormError("Erro ao criar usuário. Tente novamente.");
      console.error(err);
    }
  }
  return (
    <AuthContainer>
      <AuthCard>
        <Link href="/auth/login" passHref>
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
