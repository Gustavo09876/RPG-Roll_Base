"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HomeSideBar from "../../Components/home/SideBar/HomeSideBar";
import Main from "../../Components/home/Main/main";
import New_Table from "../../Components/home/Main/Dashboard/NewCampaign/NewCampaign";
import Uptade_Table from "../../Components/home/Main/Dashboard/UptadeCampaign/UptadeCampaign";

export interface CampaignFormData {
  id: string;
  titulo: string;
  sistema: string;
  jogadores: string;
  description: string;
  imagemUrl: File | string | null;
  created_at: string;
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeIndex1, setActiveIndex1] = useState(0);
  const [campanhaParaEditar, setCampanhaParaEditar] =
    useState<CampaignFormData | null>(null);

  const id = searchParams.get("id");

  useEffect(() => {
    const fetchMesa = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const res = await fetch(`http://localhost:3001/tables/mesas/${id}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Campanha não encontrada");

        const data = await res.json();
        setCampanhaParaEditar(data);
        setActiveIndex1(4);
      } catch (error) {
        console.error(error);
        setCampanhaParaEditar(null);
        setActiveIndex1(0);
      }
    };

    fetchMesa();
  }, [id]);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const res = await fetch("http://localhost:3001/tables/mesas", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/auth/login");
          return;
        }

        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);

        const data = await res.json();
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      }
    };

    fetchCampanhas();
  }, [router]);

  return (
    <div
      style={{ backgroundColor: "#212121", height: "100vh", display: "flex" }}
    >
      <HomeSideBar
        activeIndex1={activeIndex1}
        setActiveIndex1={setActiveIndex1}
      />
      {activeIndex1 == 0 && (
        <Main
          setActiveIndex1={setActiveIndex1}
          setCampanhaParaEditar={setCampanhaParaEditar}
        />
      )}
      {activeIndex1 == 1 && <New_Table setActiveIndex1={setActiveIndex1} />}
      {activeIndex1 == 4 && <Uptade_Table setActiveIndex1={setActiveIndex1} />}
    </div>
  );
}
