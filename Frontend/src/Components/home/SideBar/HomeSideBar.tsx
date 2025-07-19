"use client";

import React from "react";
import Logo from "../../Logo/Logo";

interface HomeSideBarProps {
  activeIndex1: number;
  setActiveIndex1: (index: number) => void;
}

export default function HomeSideBar({
  activeIndex1,
  setActiveIndex1,
}: HomeSideBarProps) {
  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        backgroundColor: "#181818",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* LOGO */}
      <div
        className="logo"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          paddingLeft: "35px",
          paddingTop: "20px",
          paddingBottom: "10px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          {/* Ícone do dado */}
          <Logo size={50}></Logo>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a
            href="#"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "15px",
            }}
          >
            RPG Roll
          </a>
          <a
            href="#"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            Sua Mesa de RPG Virtual
          </a>
        </div>
      </div>

      {/* NAVEGAÇÃO */}
      <nav
        className="navigation"
        style={{ padding: "20px", borderTop: "1px solid white" }}
      >
        <h1 style={{ fontSize: "16px", marginBottom: "20px" }}>NAVEGAÇÃO</h1>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {/* Item 1: Início */}
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              backgroundColor: activeIndex1 === 0 ? "#242424" : "transparent",
              cursor: "pointer",
              borderRadius: "8px",
              padding: "8px",
            }}
            onClick={() => setActiveIndex1(0)}
          >
            <div style={{ marginRight: "10px" }}>
              {/* Ícone de casa */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a style={{ color: "#fff", fontSize: "15px" }}>Início</a>
              <a style={{ color: "#fff", fontSize: "12px" }}>Visão geral</a>
            </div>
          </li>

          {/* Item 2: Nova Campanha */}
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              backgroundColor: activeIndex1 === 1 ? "#242424" : "transparent",
              cursor: "pointer",
              borderRadius: "8px",
              padding: "8px",
            }}
            onClick={() => setActiveIndex1(1)}
          >
            <div style={{ marginRight: "10px" }}>
              {/* Ícone de mais */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a style={{ color: "#fff", fontSize: "15px" }}>Nova Campanha</a>
              <a style={{ color: "#fff", fontSize: "12px" }}>Criar Mesa</a>
            </div>
          </li>

          {/* Item 3: Configurações */}
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              backgroundColor: activeIndex1 === 2 ? "#242424" : "transparent",
              cursor: "pointer",
              borderRadius: "8px",
              padding: "8px",
            }}
            onClick={() => setActiveIndex1(2)}
          >
            <div style={{ marginRight: "10px" }}>
              {/* Ícone de engrenagem */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cog-icon lucide-cog"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                <path d="M12 2v2" />
                <path d="M12 22v-2" />
                <path d="m17 20.66-1-1.73" />
                <path d="M11 10.27 7 3.34" />
                <path d="m20.66 17-1.73-1" />
                <path d="m3.34 7 1.73 1" />
                <path d="M14 12h8" />
                <path d="M2 12h2" />
                <path d="m20.66 7-1.73 1" />
                <path d="m3.34 17 1.73-1" />
                <path d="m17 3.34-1 1.73" />
                <path d="m11 13.73-4 6.93" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <a style={{ color: "#fff", fontSize: "15px" }}>Configurações</a>
              <a style={{ color: "#fff", fontSize: "12px" }}>
                Perfil e Preferências
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
