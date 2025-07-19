"use client";

import React, { useState, useRef } from "react";
import api from "../../Services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../../Components/Logo/Logo";
import { AuthButton } from "../../Components/Auth/AuthButton";
import { AuthCard } from "../../Components/Auth/AuthCard";
import { AuthContainer } from "../../Components/Auth/AuthContainer";
import { AuthDivider } from "../../Components/Auth/AuthDivider";
import { InputField } from "../../Components/Auth/AuthInputField";
import { GoogleSigninButton } from "../../Components/Auth/AuthGoogleSignInButton";
import { ErrorMessage } from "../../Components/Auth/AuthErrorMessage";

export default function LoginPage() {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [formError, setFormError] = useState("");

  async function Login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
      const email = emailInputRef.current.value;
      const pass1 = passwordInputRef.current.value;

      try {
        const response = await api.post("usuarios/login", {
          email,
          password: pass1,
        });

        router.push("/home");
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setFormError("E-mail ou senha incorretos!");
        } else {
          setFormError("Erro ao conectar com o servidor");
          console.error(error);
        }
      }
    } else {
      setFormError("Preencha todos os campos!");
    }
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Logo size={150} />
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: 0,
            marginBottom: 8,
            color: "#f5f5f5",
          }}
        >
          Bem Vindo a RPG RollBase
        </h2>
        <p style={{ color: "#aaa", marginBottom: 24 }}>Entre para continuar</p>

        <GoogleSigninButton />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "16px 0",
            color: "#666",
            fontSize: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#333",
            }}
          />
          <AuthDivider />
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#333",
            }}
          />
        </div>
        <form onSubmit={Login}>
          <InputField
            type="email"
            placeholder="seu@email.com"
            inputRef={emailInputRef}
          />
          <InputField
            type="password"
            placeholder="Senha"
            inputRef={passwordInputRef}
          />
          {formError && <ErrorMessage message={formError} />}

          <AuthButton type="submit" label="Entrar" />
        </form>

        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "#aaa",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="#"
            style={{
              color: "#0f62fe",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Esqueceu a senha?
          </Link>
          <span>
            Não tem uma conta?{" "}
            <Link
              href="/Register"
              style={{
                color: "#0f62fe",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Cadastre-se
            </Link>
          </span>
        </div>
      </AuthCard>
    </AuthContainer>
  );
}
