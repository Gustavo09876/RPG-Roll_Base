import React, { useState, useRef, useEffect } from "react";
import MensagemItem from "@/Components/Chat/ChatModulos/MensagemItem";
import SeletorUsuarioPersonagem from "@/Components/Chat/ChatModulos/SeletorUsuarioPersonagem";
import ChatInput from "@/Components/Chat/ChatModulos/ChatInput";

export default function ChatMensagens({ usuarios }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const chatEndRef = useRef(null);
  const [usuarioIndex, setUsuarioIndex] = useState(0);
  const [PersonagemIndex, setPersonagemIndex] = useState(0);
  const [mensagens, setMensagens] = useState([]);
  const [imagemAmpliada, setImagemAmpliada] = useState(null);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const GMIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7v14" />
      <path d="M16 12h2" />
      <path d="M16 8h2" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
      <path d="M6 12h2" />
      <path d="M6 8h2" />
    </svg>
  );

  const renderAvatarIcon = () => {
    const personagem = usuarios[usuarioIndex].Personagens[PersonagemIndex];
    if (personagem === "null") {
      return usuarios[usuarioIndex].name.charAt(0);
    } else if (personagem === "GM") {
      return <GMIcon />;
    } else {
      return personagem.charAt(0);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Chat Messages Area */}
      <div
        className="Chat"
        style={{
          display: "flex",
          flex: 1,
          height: menuAberto ? "75%" : "75%",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {mensagens.map((msg, index) => {
          const anterior = mensagens[index - 1];
          return (
            <MensagemItem
              key={index}
              msg={msg}
              anterior={anterior}
              setImagemAmpliada={setImagemAmpliada}
            />
          );
        })}
        <div ref={chatEndRef} style={{ height: "1px" }}></div>
      </div>

      {/* Character Selector Menu */}
      {menuAberto && (
        <SeletorUsuarioPersonagem
          usuarios={usuarios}
          setPersonagemIndex={setPersonagemIndex}
          toggleMenu={toggleMenu}
          usuarioIndex={usuarioIndex}
        />
      )}

      {imagemAmpliada && (
        <div
          onClick={() => setImagemAmpliada(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={imagemAmpliada}
            alt="ampliada"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "8px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      {/* Input Area */}
      <ChatInput
        renderAvatarIcon={renderAvatarIcon}
        onEnviarMensagem={async ({ texto, imagem }) => {
          const personagem =
            usuarios[usuarioIndex].Personagens[PersonagemIndex];
          const isNullPersonagem = personagem === "null";
          const isGM = personagem === "GM";

          const novaMensagem = {
            id: Date.now(),
            autor: isNullPersonagem ? usuarios[usuarioIndex].name : personagem,
            texto,
            imagem,
            icon: isNullPersonagem ? (
              usuarios[usuarioIndex].name.charAt(0)
            ) : isGM ? (
              <GMIcon />
            ) : (
              personagem.charAt(0)
            ),
            horario: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setMensagens((msgs) => [...msgs, novaMensagem]);
        }}
        toggleMenu={toggleMenu}
      />
    </div>
  );
}
