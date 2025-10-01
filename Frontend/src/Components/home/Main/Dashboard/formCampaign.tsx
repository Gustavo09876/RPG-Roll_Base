"use client";

import { useRouter, useSearchParams } from "next/navigation"; // note aqui
import { useEffect, useState } from "react";

export interface FormData {
  id: string;
  name: string;
  sistema: string;
  jogadores: string;
  description: string;
  imagemUrl: File | string | null;
  created_at: string;
}

interface FormCampaignProps {
  textButton: string;
  onSubmit: (form: FormData) => void;
}

export default function FormCampaign({
  textButton,
  onSubmit,
}: FormCampaignProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const [form, setForm] = useState<FormData>({
    id: "",
    name: "",
    sistema: "",
    jogadores: "0",
    description: "",
    imagemUrl: null,
    created_at: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID da campanha:", id);
    if (id) {
      fetch(`http://localhost:3001/tables/${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setForm({
            id: data.id,
            name: data.titulo,
            sistema: data.sistema,
            jogadores: data.jogadores,
            description: data.description,
            imagemUrl: data.imagemUrl || null,
            created_at: data.created_at,
          });
        })
        .catch((err) => {
          console.error("Erro ao carregar dados da mesa:", err);
        });
    }
  }, [id]);

  useEffect(() => {
    console.log("Form atualizado:", form);
    if (form.imagemUrl instanceof File) {
      const url = URL.createObjectURL(form.imagemUrl);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(form.imagemUrl || null);
    }
  }, [form]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(form);
  }

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
      setForm({ ...form, imagemUrl: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm({ ...form, imagemUrl: null });
      setPreviewUrl(null);
    }
  }

  return (
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
            name="name"
            placeholder="Ex: A Lenda dos Heróis Perdidos"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          <span style={labelText}>Sistema de RPG</span>
          <input
            name="sistema"
            placeholder="D&D 5e, Pathfinder, Cyberpunk 2077, Outro"
            value={form.sistema}
            onChange={handleChange}
            style={inputStyle}
          ></input>
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
          <span style={labelText}>Descrição da Campanha</span>
          <textarea
            name="description"
            placeholder="Descreva sua campanha, a história, os personagens principais..."
            value={form.description}
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
          <button type="submit" style={submitButtonStyle}>
            {textButton}
          </button>
        </div>
      </div>
    </form>
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
