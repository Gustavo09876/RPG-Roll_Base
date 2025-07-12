import React from "react";

export default function RegisterPage() {
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
        <input
          type="email"
          placeholder="seu@email.com"
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
      </div>
    </div>
  );
}
