"use client";

import React, { useState, useRef } from "react";
import api from "../../Services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div
      style={{
        backgroundColor: "#111315",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          backgroundColor: "#1c1c1e",
          width: 380,
          padding: 32,
          borderRadius: 12,
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <img
          alt="Logo TableTank"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            marginBottom: 16,
            objectFit: "cover",
            backgroundColor: "#0f0f0f",
          }}
        />
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

        <button
          style={{
            backgroundColor: "#2a2a2d",
            border: "1px solid #444",
            borderRadius: 8,
            width: "100%",
            padding: 10,
            fontWeight: 600,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google Icon"
            width="20"
            height="20"
          />
          <span>Entrar com o Google</span>
        </button>

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
          <span style={{ margin: "0 12px" }}>OU</span>
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#333",
            }}
          />
        </div>
        <form onSubmit={Login}>
          <input
            type="email"
            placeholder="seu@email.com"
            ref={emailInputRef}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#2a2a2d",
              border: "1px solid #444",
              borderRadius: 8,
              marginBottom: 16,
              color: "#f5f5f5",
              fontSize: 14,
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            ref={passwordInputRef}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#2a2a2d",
              border: "1px solid #444",
              borderRadius: 8,
              marginBottom: 16,
              color: "#f5f5f5",
              fontSize: 14,
            }}
          />
          {formError && (
            <div
              style={{
                color: "red",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {formError}
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#0f62fe", // Azul destaque
              color: "#fff",
              width: "100%",
              padding: 10,
              borderRadius: 8,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
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
              href="/Cadastro"
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
      </div>
    </div>
  );
}
