import { useState } from "react";
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

interface NewTableProps {
  setActiveIndex1: (index: number) => void;
}

export default function CreateCampaign({ setActiveIndex1 }: NewTableProps) {
  const [form, setForm] = useState<CampaignFormData>({
    id: "",
    name: "",
    sistema: "",
    jogadores: "0",
    description: "",
    imagemUrl: null,
    created_at: "",
  });

  const handleSubmit = async (form: CampaignFormData) => {
    if (!form.name || !form.sistema) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("sistema", form.sistema);
      formData.append("jogadores", form.jogadores);
      formData.append("description", form.description);
      if (form.imagemUrl instanceof File) {
        formData.append("imagem", form.imagemUrl);
      }

      const response = await fetch("http://localhost:3001/tables/", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Campanha criada com sucesso!");
        // opcional: resetar o formulário, se gerenciado externamente
      } else {
        alert("Erro ao criar campanha.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao criar campanha.");
    }
  };

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
            className="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "600",
          }}
        >
          Criar Nova Campanha
        </h1>
      </div>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#9ca3af",
          marginBottom: "1.5rem",
        }}
      >
        Forje uma nova aventura épica
      </p>
      <FormCampaign textButton="Criar Campanha" onSubmit={handleSubmit} />

      {/* Botões */}
    </div>
  );
}
