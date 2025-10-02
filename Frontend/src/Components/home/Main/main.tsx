"use Client";

import { useRouter } from "next/navigation";
import CardCampanha from "./CardCampanha";
import { useEffect, useState } from "react";
import { init } from "next/dist/compiled/webpack/webpack";

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
  setCampanhaParaEditar: React.Dispatch<
    React.SetStateAction<CampaignFormData | null>
  >;
  setId: (index: string) => void;
}

export default function Main({
  setActiveIndex1,
  setCampanhaParaEditar,
  setId,
}: NewTableProps) {
  const [activeIndex2, setActiveIndex2] = useState(0);
  const [campanhas, setCampanhas] = useState<CampaignFormData[]>([]);
  const router = useRouter();

  function abrirEdicao(campanha: CampaignFormData) {
    setActiveIndex1(2);
    setCampanhaParaEditar(campanha);
    setId(campanha.id);
    console.log("ID 1", campanha.id);
  }

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        console.log("Teste1");
        let res = await fetch("http://localhost:3001/tables", {
          credentials: "include",
        });

        if (res.status === 403) {
          console.log("Teste2");
          const refreshRes = await fetch(
            "http://localhost:3001/users/refresh",
            {
              method: "POST",
              credentials: "include",
            }
          );
          if (refreshRes.ok) {
            res = await fetch("http://localhost:3001/tables", {
              credentials: "include",
            });
          } else {
            router.push("/auth/login");
            return;
          }
        }

        if (res.status === 401) {
          router.push("/auth/login");
          return;
        }

        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);

        const data = await res.json();
        setCampanhas(data);
        console.log("olhar aqui", data);
      } catch (error) {
        console.error("Erro ao carregar campanhas:", error);
      }
    };

    fetchCampanhas();
  }, [router]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          height: "100%",
          flexDirection: "column",
          paddingLeft: "auto",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            marginBottom: "20px",
            paddingRight: "auto",
            paddingLeft: "auto",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70px"
              height="70px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-dice6-icon lucide-dice-6"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <path d="M16 8h.01" />
              <path d="M16 12h.01" />
              <path d="M16 16h.01" />
              <path d="M8 8h.01" />
              <path d="M8 12h.01" />
              <path d="M8 16h.01" />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "25px",
              }}
            >
              RPG Roll
            </a>
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "19px",
              }}
            >
              Bem-vindo ao seu reino de aventuras épicas
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "20px",
            gap: "15px",
          }}
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
            className="lucide lucide-sparkles-icon lucide-sparkles"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
          Gerencie suas campanhas épicas
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
            className="lucide lucide-sparkles-icon lucide-sparkles"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            <path d="M20 3v4" />
            <path d="M22 5h-4" />
            <path d="M4 17v2" />
            <path d="M5 18H3" />
          </svg>
        </div>
        <div
          className="TopBar"
          style={{
            display: "flex",
            width: "100%",
            padding: "20px",
            gap: "20px",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Pesquisar campanhas..."
            style={{
              width: "220px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#303030",
            }}
          />
          <button
            style={{
              borderRadius: "8px",
              width: "150px",
              padding: "10px",
              backgroundColor: activeIndex2 === 0 ? "#303030" : "#262626",
            }}
            onClick={() => setActiveIndex2(0)}
          >
            Todas
          </button>
          <button
            style={{
              borderRadius: "8px",
              width: "150px",
              padding: "10px",
              backgroundColor: activeIndex2 === 1 ? "#303030" : "#262626",
            }}
            onClick={() => setActiveIndex2(1)}
          >
            Ativas
          </button>
          <button
            style={{
              borderRadius: "8px",
              width: "150px",
              padding: "10px",
              backgroundColor: activeIndex2 === 2 ? "#303030" : "#262626",
            }}
            onClick={() => setActiveIndex2(2)}
          >
            Pausadas
          </button>
          <button
            style={{
              borderRadius: "8px",
              width: "150px",
              padding: "10px",
              backgroundColor: activeIndex2 === 3 ? "#303030" : "#262626",
            }}
            onClick={() => setActiveIndex2(3)}
          >
            Recrutando
          </button>
          <button
            style={{
              borderRadius: "8px",
              width: "200px",
              padding: "10px",
              backgroundColor: activeIndex2 === 4 ? "#303030" : "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
            onClick={() => setActiveIndex1(1)}
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
              className="lucide lucide-plus-icon lucide-plus"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Nova Campanha
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "20px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {campanhas.map((campanha) => (
            <CardCampanha
              key={campanha.id}
              {...campanha}
              onEdit={() => abrirEdicao(campanha)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
