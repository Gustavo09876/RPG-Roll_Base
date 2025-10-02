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
  const [campanhaParaEditar, setCampanhaParaEditar] =
    useState<CampaignFormData | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [activeIndex1, setActiveIndex1] = useState(0);

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
          setCampanhaParaEditar={(campanha) => {
            setCampanhaParaEditar(campanha);
          }}
          setId={setId}
        />
      )}
      {activeIndex1 == 1 && <New_Table setActiveIndex1={setActiveIndex1} />}
      {activeIndex1 == 2 && campanhaParaEditar && (
        <Uptade_Table setActiveIndex1={setActiveIndex1} campaignId={id!} />
      )}
    </div>
  );
}
