interface CardCampanhaProps {
  id: string;
  titulo: string;
  mestre: string;
  sistema: string;
  status: "ATIVA" | "RECRUTANDO" | "PAUSADA";
  jogadores: string;
  description: string;
  ambientacao: string;
  imagemUrl?: string;
  created_at: string;
}

export default function CardCampanha({
  id,
  titulo,
  mestre,
  sistema,
  status,
  jogadores,
  description,
  ambientacao,
  imagemUrl,
  created_at,
}: CardCampanhaProps) {
  const statusColor = {
    ATIVA: "#16a34a",
    RECRUTANDO: "#0ea5e9",
    PAUSADA: "#facc15",
  };

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        border: "1px solid #333",
        borderRadius: "10px",
        width: "300px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${imagemUrl ?? "https://via.placeholder.com/300x120"})`,
          backgroundSize: "cover",
          height: "120px",
          display: "flex",
          alignItems: "flex-start",
          gap: "5px",
          padding: "10px",
        }}
      >
        <span
          style={{
            backgroundColor: "#334155",
            fontSize: "12px",
            padding: "2px 6px",
            borderRadius: "5px",
          }}
        >
          🎲 {sistema}
        </span>
        <span
          style={{
            backgroundColor: statusColor[status],
            fontSize: "12px",
            padding: "2px 6px",
            borderRadius: "5px",
          }}
        >
          {status}
        </span>
      </div>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: "18px" }}>{titulo}</h3>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>👑 {mestre}</p>
        </div>
        <p style={{ margin: 0, fontSize: "14px", color: "#cbd5e1" }}>
          👥 {jogadores}
        </p>
        <p style={{ fontSize: "13px", color: "#cbd5e1" }}>{description}</p>
        <p style={{ fontSize: "14px" }}>✨ {ambientacao}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid #3B82F6",
              color: "#3B82F6",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ▶ Entrar na Mesa
          </button>
          <button
            style={{
              background: "transparent",
              border: "1px solid #909090",
              color: "#9CA3AF",
              width: "40px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
}
