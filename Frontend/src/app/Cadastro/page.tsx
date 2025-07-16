"use client";

import React, { useState, useRef } from "react";
import api from "../../Services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 10,
            backgroundColor: "#2a2a2d",
            border: "1px solid #444",
            borderRadius: 8,
            color: "#f5f5f5",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 24,
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          Cadastrar com o Google
        </button>

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
          <span style={{ margin: "0 12px" }}>ou</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
        </div>

        {/* Inputs */}
        <form onSubmit={createUser}>
          <input
            type="name"
            placeholder="name"
            ref={nameInputRef}
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
            placeholder="Mín. 8 caracteres"
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

          <input
            type="password"
            placeholder="Confirmar senha"
            ref={password2InputRef}
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#2a2a2d",
              border: "1px solid #444",
              borderRadius: 8,
              marginBottom: 24,
              color: "#f5f5f5",
              fontSize: 14,
            }}
          />

          {formError && (
            <div
              style={{
                color: "#d946ef", // vermelho suave
                backgroundColor: "#1f1f1f",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "14px",
                border: "1px solid #d946ef",
              }}
            >
              {formError}
            </div>
          )}

          <button
            style={{
              backgroundColor: "#0f62fe",
              color: "#fff",
              width: "100%",
              padding: 10,
              borderRadius: 8,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}
