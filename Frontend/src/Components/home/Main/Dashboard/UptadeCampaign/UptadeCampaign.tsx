"use client";

import { useState, useEffect } from "react";
import FormCampaign from "../formCampaign";

export interface CampaignFormData {
  id: string;
  name: string;
  sistema: string;
  jogadores: string;
  description: string;
  imagemUrl: File | string | null;
  created_at: string;
}

interface EditCampaignProps {
  setActiveIndex1: (index: number) => void;
  campaignId: string; // id da campanha que queremos editar
}

export default function EditCampaign({
  setActiveIndex1,
  campaignId,
}: EditCampaignProps) {
  const [form, setForm] = useState<CampaignFormData | null>(null);

  // Carregar os dados da campanha ao montar o componente
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        console.log("ID 3:", campaignId);
        const response = await fetch(
          `http://localhost:3001/tables/${campaignId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar campanha");
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar campanha");
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleSubmit = async (updatedForm: CampaignFormData) => {
    if (!updatedForm.name || !updatedForm.sistema) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", updatedForm.name);
      formData.append("sistema", updatedForm.sistema);
      formData.append("jogadores", updatedForm.jogadores);
      formData.append("description", updatedForm.description);
      if (updatedForm.imagemUrl instanceof File) {
        formData.append("imagem", updatedForm.imagemUrl);
      }

      const response = await fetch(
        `http://localhost:3001/tables/${campaignId}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Campanha atualizada com sucesso!");
        setActiveIndex1(0);
      } else {
        throw new Error("Erro ao atualizar campanha");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar campanha.");
    }
  };

  if (!form) return <p style={{ color: "white" }}>Carregando campanha...</p>;

  return (
    <div style={{ padding: "1.5rem", color: "white" }}>
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
          onClick={() => setActiveIndex1(0)}
        >
          ←
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
        Modifique os detalhes da sua aventura
      </p>
      <FormCampaign
        textButton="Salvar Alterações"
        onSubmit={handleSubmit}
        id={campaignId}
      />
    </div>
  );
}
