"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FormCampaign from "../formCampaign";

export interface CampaignFormData {
  id: string;
  titulo: string;
  sistema: string;
  jogadores: string;
  description: string;
  imagemUrl: File | string | null;
  created_at: string;
}

interface NewTableProps {
  setActiveIndex1: (index: number) => void;
}

export default function UpdateCampaign({ setActiveIndex1 }: NewTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("edit");

  const [form, setForm] = useState<CampaignFormData>({
    id: "", // ou gerar um UUID temporário, se necessário
    titulo: "",
    sistema: "",
    jogadores: "0",
    description: "",
    imagemUrl: null,
    created_at: "",
  });

  function handleSubmit(form: CampaignFormData) {
    const formData = new FormData();
    formData.append("titulo", form.titulo);
    formData.append("description", form.description);
    formData.append("sistema", form.sistema);
    formData.append("jogadores", form.jogadores.toString());
    if (form.imagemUrl && typeof form.imagemUrl !== "string") {
      formData.append("imagem", form.imagemUrl);
    }

    fetch(`http://localhost:3001/tables/mesas/${id}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          const erro = await response.json();
          console.error("Erro ao atualizar campanha:", erro);
          return;
        }
        const result = await response.json();
        console.log("Campanha atualizada com sucesso:", result);
        setActiveIndex1(0);
      })
      .catch((error) => {
        console.error("Erro de rede:", error);
      });
  }

  return (
    <div style={{ padding: "1.5rem", color: "white" }}>
      {/* Cabeçalho */}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <button
          style={{
            backgroundColor: "#181818",
            padding: "6px",
            borderRadius: "5px",
            marginRight: "7px",
            cursor: "pointer",
          }}
          onClick={() => {
            setActiveIndex1(0);
            router.push("/home");
          }}
        >
          {/* Ícone de Voltar */}
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "600" }}>
          Editar Campanha
        </h1>
      </div>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#9ca3af",
          marginBottom: "1.5rem",
        }}
      >
        Modifique as informações da sua aventura
      </p>

      {/* Formulário */}
      <FormCampaign textButton="Atualizar Campanha" />
    </div>
  );
}
