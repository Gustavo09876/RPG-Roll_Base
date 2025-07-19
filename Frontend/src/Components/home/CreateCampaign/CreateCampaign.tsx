import { useState } from "react";

interface FormData {
  nome: string;
  sistema: string;
  jogadores: number;
  ambientacao: string;
  dificuldade: string;
  descricao: string;
  imagem: File | null;
}

interface NewTableProps {
  setActiveIndex1: (index: number) => void;
}

export default function CreateCampaign({ setActiveIndex1 }: NewTableProps) {
  const [form, setForm] = useState<FormData>({
    nome: "",
    sistema: "",
    jogadores: 0,
    ambientacao: "",
    dificuldade: "Intermediário",
    descricao: "",
    imagem: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const sistemas = ["D&D 5e", "Pathfinder", "Cyberpunk 2077", "Outro"];
  const dificuldades = ["Iniciante", "Intermediário", "Avançado"];

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setForm({ ...form, imagem: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      // Usuário cancelou a seleção — limpa o form e o preview
      setForm({ ...form, imagem: null });
      setPreviewUrl(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.nome);
    formData.append("description", form.descricao);
    formData.append("sistema", form.sistema);
    formData.append("ambientacao", form.ambientacao);
    formData.append("dificuldade", form.dificuldade);
    formData.append("jogadores", form.jogadores.toString());
    if (form.imagem) {
      formData.append("imagem", form.imagem);
    }

    try {
      const response = await fetch("http://localhost:3001/tables/mesas", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const erro = await response.json();
        console.error("Erro ao criar campanha:", erro);
      } else {
        const result = await response.json();
        console.log("Campanha criada com sucesso:", result);
        setActiveIndex1(0);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  }

  return (
    <div style={{ padding: "1.5rem", color: "white" }}>
      <h1
        style={{
          fontSize: "1.875rem",
          fontWeight: "600",
          marginBottom: "0.25rem",
        }}
      >
        Criar Nova Campanha
      </h1>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#9ca3af",
          marginBottom: "1.5rem",
        }}
      >
        Forje uma nova aventura épica
      </p>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "row",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Informações Básicas */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>📘 Informações Básicas</h2>

          <label style={labelStyle}>
            <span style={labelText}>Nome da Campanha</span>
            <input
              type="text"
              name="nome"
              placeholder="Ex: A Lenda dos Heróis Perdidos"
              value={form.nome}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            <span style={labelText}>Sistema de RPG</span>
            <select
              name="sistema"
              value={form.sistema}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Selecione o sistema</option>
              {sistemas.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            <span style={labelText}>Máximo de Jogadores</span>
            <input
              type="number"
              name="jogadores"
              min="1"
              max="10"
              value={form.jogadores}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
        </div>

        {/* Detalhes da Aventura */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>✨ Detalhes da Aventura</h2>

          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div style={{ marginBottom: "1rem" }}>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Prévia da Imagem"
                    style={{
                      width: "70px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                      border: "1px solid #3f3f46",
                      marginTop: "0.5rem",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "70px",
                      height: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "0.5rem",
                      border: "1px dashed #3f3f46",
                      marginTop: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-upload"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <label style={labelStyle}>
              <span style={labelText}>Imagem de Capa</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  marginTop: "0.25rem",
                  backgroundColor: "#27272a",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  color: "#d1d5db",
                  border: "1px solid #3f3f46",
                  width: "100%",
                }}
              />
            </label>
          </div>

          <label style={labelStyle}>
            <span style={labelText}>Ambientação</span>
            <input
              type="text"
              name="ambientacao"
              placeholder="Ex: Reino de Valmont, Cyberpunk 2077"
              value={form.ambientacao}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            <span style={labelText}>Nível de Dificuldade</span>
            <select
              name="dificuldade"
              value={form.dificuldade}
              onChange={handleChange}
              style={inputStyle}
            >
              {dificuldades.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            <span style={labelText}>Descrição da Campanha</span>
            <textarea
              name="descricao"
              placeholder="Descreva sua campanha, a história, os personagens principais..."
              value={form.descricao}
              onChange={handleChange}
              rows={6}
              style={{
                ...inputStyle,
                resize: "none",
              }}
            ></textarea>
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1.5rem",
              gap: "0.75rem",
            }}
          >
            <button type="button" style={cancelButtonStyle}>
              Cancelar
            </button>
            <button type="submit" style={submitButtonStyle}>
              Criar Campanha
            </button>
          </div>
        </div>
      </form>
      {/* Botões */}
    </div>
  );
}

// Estilos reutilizáveis
const cardStyle = {
  backgroundColor: "#181818",
  borderRadius: "1rem",
  padding: "1.5rem",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  border: "1px solid #27272a",
  flex: 1,
  minWidth: "300px",
};

const sectionTitle = {
  fontSize: "1.125rem",
  fontWeight: "600",
  marginBottom: "1rem",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.75rem",
};

const labelText = {
  fontSize: "0.875rem",
  color: "#d1d5db",
};

const inputStyle = {
  marginTop: "0.25rem",
  width: "100%",
  borderRadius: "0.5rem",
  backgroundColor: "#27272a",
  border: "1px solid #3f3f46",
  padding: "0.5rem 1rem",
  fontSize: "0.875rem",
  color: "white",
};

const cancelButtonStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#3f3f46",
  fontSize: "0.875rem",
  color: "#d1d5db",
  border: "none",
  cursor: "pointer",
};

const submitButtonStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#4f46e5",
  fontSize: "0.875rem",
  fontWeight: "500",
  color: "white",
  border: "none",
  cursor: "pointer",
};
