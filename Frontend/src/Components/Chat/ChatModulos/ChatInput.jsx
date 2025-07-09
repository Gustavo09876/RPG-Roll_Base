import React, { useState, useRef, useEffect } from "react";

export default function ChatInput({
  onEnviarMensagem,
  renderAvatarIcon,
  toggleMenu,
}) {
  const [mensagem, setMensagem] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const inputFileRef = useRef(null);
  const textareaRef = useRef(null);

  const mascaraRef = useRef(null);

  const autoResize = () => {
    const el = textareaRef.current;
    const mask = mascaraRef.current;
    if (el && mask) {
      el.style.height = "auto";
      mask.style.height = "auto";

      let newHeight = el.scrollHeight;

      if (newHeight < 40) newHeight = 40;
      else if (newHeight > 80) newHeight = 80;

      el.style.height = newHeight + "px";
      mask.style.height = newHeight + "px";

      el.style.overflowY = newHeight === 80 ? "auto" : "hidden";
    }
  };

  const sharedTextStyle = {
    width: "100%",
    fontSize: "16px",
    fontFamily: "inherit",
    lineHeight: "1.3",
    borderRadius: "5px",
    boxSizing: "border-box",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    overflow: "hidden",
    resize: "none",
    minHeight: "40px",
    maxHeight: "80px",
    padding: "8px",
  };

  // Função para formatar texto com destaque em //...//
  function formatarTexto(texto) {
    const escHtml = (str) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");

    const regex = /\/\/([\s\S]*?)(\/\/|$)/g;

    return escHtml(texto).replace(regex, (match, p1, p2) => {
      return `<span style="background-color: #2a2a2a; color: #c084fc; font-weight: bold;"><span style="color: #999">//</span>${p1}<span style="color: #999">${p2 === "//" ? "//" : ""}</span></span>`;
    });
  }

  useEffect(() => {
    autoResize();
  }, [mensagem]);
  const handleChange = (e) => {
    setMensagem(e.target.value);
    autoResize();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const clearImagePreview = () => {
    setImagePreviewUrl(null);
    setSelectedFile(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  function interpretarTextoComRolagens(texto) {
    const regex = /\/\/(\d*)d(\d+)\/\//gi;

    return texto.replace(regex, (match, qtdStr, ladosStr) => {
      const quantidade = qtdStr ? parseInt(qtdStr) : 1;
      const lados = parseInt(ladosStr);

      if (isNaN(quantidade) || isNaN(lados) || quantidade <= 0 || lados <= 0) {
        return match;
      }

      const resultados = [];
      for (let i = 0; i < quantidade; i++) {
        resultados.push(Math.floor(Math.random() * lados) + 1);
      }

      const soma = resultados.reduce((a, b) => a + b, 0);

      return `<span style="
        white-space: nowrap;
        background-color: #60a5fa      ;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
        font-weight: bold;
      ">🎲 ${soma}</span>`;
    });
  }

  const enviar = async () => {
    if (!mensagem.trim() && !selectedFile) return;

    let base64 = null;
    if (selectedFile) base64 = await getBase64(selectedFile);

    // 1. Interpreta as rolagens como antes
    let textoComRolagens = interpretarTextoComRolagens(mensagem.trim());

    // 2. Aplica o destaque visual (apenas se for string)
    if (typeof textoComRolagens === "string") {
      textoComRolagens = textoComRolagens.replace(
        /🎲 \[(.*?)\]/g,
        (_, conteudo) => {
          return `<span style="
        background: #4b5563;
        color: #fff;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
        font-weight: bold;
        border: 1px solid #c084fc;
        box-shadow: 0 0 6px rgba(192,132,252,0.4);
      ">🎲 [${conteudo}]</span> abacate`;
        }
      );
    }

    // 3. Envia a mensagem formatada (com ou sem imagem)
    onEnviarMensagem({ texto: textoComRolagens, imagem: base64 });

    // 4. Limpa tudo
    setMensagem("");
    clearImagePreview();
  };

  const clicarNaImage = () => {
    inputFileRef.current?.click();
  };

  return (
    <>
      {imagePreviewUrl && (
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "5px",
            width: "100px",
            height: "100px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            zIndex: 10,
            marginRight: "20px",
          }}
        >
          <img
            src={imagePreviewUrl}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <button
            onClick={clearImagePreview}
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              fontWeight: "bold",
              lineHeight: "20px",
              textAlign: "center",
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "5px",
          gap: "10px",
          borderTop: "1px solid #333",
          position: "relative",
        }}
      >
        {/* Container textarea mascarado */}
        <div
          style={{
            position: "relative",
            width: "90%",
            fontSize: "16px",
            fontFamily: "inherit",
            lineHeight: "1.3",
          }}
        >
          {/* Div mascarada por trás para mostrar texto estilizado */}
          <div
            ref={mascaraRef}
            aria-hidden="true"
            style={{
              ...sharedTextStyle,
              position: "absolute",
              top: 0,
              left: 0,
              color: "white",
              backgroundColor: "#303030",
              pointerEvents: "none",
              userSelect: "none",
              overflowY: "auto",
              zIndex: 1,
            }}
            dangerouslySetInnerHTML={{
              __html:
                formatarTexto(mensagem) ||
                '<span style="color:#888">Digite uma mensagem...</span>',
            }}
          />

          <textarea
            ref={textareaRef}
            value={mensagem}
            onChange={handleChange}
            onScroll={() => {
              if (mascaraRef.current && textareaRef.current) {
                mascaraRef.current.scrollTop = textareaRef.current.scrollTop;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // evita a quebra de linha
                enviar(); // chama a função que envia a mensagem
              }
            }}
            style={{
              ...sharedTextStyle,
              position: "relative",
              background: "transparent",
              color: "transparent",
              caretColor: "white",
              border: "1px solid #555",
              zIndex: 2,
              resize: "none",
              overflowY: "auto",
            }}
          />
        </div>

        {/* Toolbar e botões */}
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
            paddingBottom: "5px",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <button onClick={toggleMenu} style={{ cursor: "pointer" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "white",
                backgroundColor: "#181818",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              {renderAvatarIcon()}
            </div>
          </button>

          <div
            style={{
              display: "flex",
              borderRight: "1px solid #333",
              paddingRight: "10px",
              gap: "5px",
            }}
          >
            <button onClick={clicarNaImage} style={{ cursor: "pointer" }}>
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
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Ícones extras */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
              borderRight: "1px solid #333",
              paddingRight: "10px",
            }}
          >
            {/* Seus SVGs... */}
            {/* Vou deixar igual seu original */}
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
              <line x1="4" x2="20" y1="9" y2="9" />
              <line x1="4" x2="20" y1="15" y2="15" />
              <line x1="10" x2="8" y1="3" y2="21" />
              <line x1="16" x2="14" y1="3" y2="21" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="7" r="2" />
              <circle cx="12" cy="17" r="2" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="20" x2="13" y2="4" />
              <line x1="11" y1="20" x2="17" y2="4" />
            </svg>
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
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <line x1="8" x2="16" y1="6" y2="6" />
              <line x1="16" x2="16" y1="14" y2="18" />
              <path d="M16 10h.01" />
              <path d="M12 10h.01" />
              <path d="M8 10h.01" />
              <path d="M12 14h.01" />
              <path d="M8 14h.01" />
              <path d="M12 18h.01" />
              <path d="M8 18h.01" />
            </svg>
          </div>

          {/* Botão enviar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
              paddingRight: "10px",
            }}
          >
            <button onClick={enviar}>
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
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
