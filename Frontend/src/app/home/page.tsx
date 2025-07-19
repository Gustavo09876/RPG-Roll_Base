"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeSideBar from "../../Components/home/SideBar/HomeSideBar";
import Main from "../../Components/home/Main/main";
import New_Table from "../../Components/home/CreateCampaign/CreateCampaign";

export default function HomePage() {
  const router = useRouter();
  const [activeIndex1, setActiveIndex1] = useState(0);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const res = await fetch("http://localhost:3001/tables/mesas", {
          credentials: "include",
        });

        if (res.status === 401) {
          // Usuário não autenticado
          router.push("/Login");
          return;
        }

        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
      } catch (error) {}
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
      {activeIndex1 == 0 && <Main></Main>}
      {activeIndex1 == 1 && (
        <New_Table setActiveIndex1={setActiveIndex1}></New_Table>
      )}
    </div>
  );
}
