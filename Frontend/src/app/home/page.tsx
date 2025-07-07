'use client';

import { useState } from "react";
import CardCampanha from '../../Components/CardCampanha/CardCampanha';

export default function HomePage() {
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);
    type Status = 'ATIVA' | 'RECRUTANDO' | 'PAUSADA';
    type Campanha = {
        titulo: string;
        mestre: string;
        sistema: string;
        status: Status;
        jogadores: string;
        descricao: string;
        ambientacao: string;
    };
    const campanhas: Campanha[] = [
    {
        titulo: 'A Lenda dos Heróis Perdidos',
        mestre: 'Mestre Gandalf',
        sistema: 'DND5E',
        status: 'ATIVA',
        jogadores: '4/6',
        descricao: 'Heróis devem recuperar os artefatos perdidos para salvar o reino de Valmont da destruição iminente...',
        ambientacao: 'Reino de Valmont',
    },
    {
        titulo: 'Sombras de Arkham',
        mestre: 'Mestre Lovecraft',
        sistema: 'CALL_OF_CTHULHU',
        status: 'RECRUTANDO',
        jogadores: '2/4',
        descricao: 'Investigadores enfrentam horrores cósmicos na cidade de Arkham. Uma campanha de terror e mistério.',
        ambientacao: 'Arkham, 1920',
    },
    {
        titulo: 'Cruzada Cyberpunk',
        mestre: 'Mestre Akira',
        sistema: 'CYBERPUNK',
        status: 'PAUSADA',
        jogadores: '3/5',
        descricao: 'Em um futuro distópico, um grupo de mercenários luta contra megacorporações em busca de justiça.',
        ambientacao: 'Neo-Tóquio',
    },
    {
        titulo: 'Cruzada Cyberpunk',
        mestre: 'Mestre Akira',
        sistema: 'CYBERPUNK',
        status: 'PAUSADA',
        jogadores: '3/5',
        descricao: 'Em um futuro distópico, um grupo de mercenários luta contra megacorporações em busca de justiça.',
        ambientacao: 'Neo-Tóquio',
    },
    {
        titulo: 'Cruzada Cyberpunk',
        mestre: 'Mestre Akira',
        sistema: 'CYBERPUNK',
        status: 'PAUSADA',
        jogadores: '3/5',
        descricao: 'Em um futuro distópico, um grupo de mercenários luta contra megacorporações em busca de justiça.',
        ambientacao: 'Neo-Tóquio',
    },
    {
        titulo: 'Cruzada Cyberpunk',
        mestre: 'Mestre Akira',
        sistema: 'CYBERPUNK',
        status: 'PAUSADA',
        jogadores: '3/5',
        descricao: 'Em um futuro distópico, um grupo de mercenários luta contra megacorporações em busca de justiça.',
        ambientacao: 'Neo-Tóquio',
    },
    {
        titulo: 'Cruzada Cyberpunk',
        mestre: 'Mestre Akira',
        sistema: 'CYBERPUNK',
        status: 'PAUSADA',
        jogadores: '3/5',
        descricao: 'Em um futuro distópico, um grupo de mercenários luta contra megacorporações em busca de justiça.',
        ambientacao: 'Neo-Tóquio',
    },
    {
        titulo: 'Cruzada Cyberpunk',
        mestre: 'Mestre Akira',
        sistema: 'CYBERPUNK',
        status: 'PAUSADA',
        jogadores: '3/5',
        descricao: 'Em um futuro distópico, um grupo de mercenários luta contra megacorporações em busca de justiça.',
        ambientacao: 'Neo-Tóquio',
    },
    ];

  return (
    <div style={{ backgroundColor: '#212121', height: '100vh', display: 'flex' }}>
        <div className="sidebar" style={{ width: '250px', backgroundColor: '#181818', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div className='logo' style={{display: 'flex', alignItems: 'center', marginBottom: '20px', paddingRight: 'auto', paddingLeft: '35px', paddingTop: '20px', paddingBottom: '10px' }}>
                <div style={{ marginRight: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dice6-icon lucide-dice-6"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/><path d="M8 8h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>RPG Roll</a>
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Sua Mesa de RPG Virtual</a>
                </div>
            </div>
            <nav className="navigation" style={{ padding: '20px', borderTop: '1px solid white' }}>
                <h1 style={{ fontSize: '16px', marginBottom: '20px',  }}>NAVEGAÇÃO</h1>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {/* Home Page */}
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: activeIndex1 === 0 ? '#242424' : 'transparent', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}
                        onClick={() => setActiveIndex1(0)}>
                        <div style={{ marginRight: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Início</a>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Visão geral</a>
                        </div>
                    </li>
                    {/* Nova Campanha */}
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: activeIndex1 === 1 ? '#242424' : 'transparent', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}
                        onClick={() => setActiveIndex1(1)}>
                        <div style={{ marginRight: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Nova Campanha</a>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Criar Mesa</a>
                        </div>
                    </li>
                    {/* Configurações */}
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: activeIndex1 === 2 ? '#242424' : 'transparent', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}
                        onClick={() => setActiveIndex1(2)}>
                        <div style={{ marginRight: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Configurações</a>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Perfil e Preferencias</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div style={{ display: 'flex', flexGrow: 1,  height: '100%', flexDirection: 'column', paddingLeft: 'auto', alignItems: 'center', overflow: 'auto',   }}>
            <div className='logo' style={{display: 'flex', marginBottom: '20px', paddingRight: 'auto', paddingLeft: 'auto', paddingTop: '20px', paddingBottom: '10px', }}>
                <div style={{ marginRight: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dice6-icon lucide-dice-6"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/><path d="M8 8h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '25px' }}>RPG Roll</a>
                    <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '19px' }}>Bem-vindo ao seu reino de aventuras épicas</a>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '20px', gap: '15px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles-icon lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                Gerencie suas campanhas épicas
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles-icon lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
            </div>
            <div className="TopBar" style={{display: 'flex', width: '100%', padding: '50px', gap: '20px', alignContent: 'center', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                <input type="text" placeholder="Pesquisar campanhas..." style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#303030' }} />    
                <button style={{borderRadius: '8px', width: '150px', padding: '10px', backgroundColor: activeIndex2 === 0 ? '#303030' : '#262626' }} onClick={() => setActiveIndex2(0)}>Todas</button>
                <button style={{borderRadius: '8px', width: '150px', padding: '10px', backgroundColor: activeIndex2 === 1 ? '#303030' : '#262626' }} onClick={() => setActiveIndex2(1)}>Ativas</button>
                <button style={{borderRadius: '8px', width: '150px', padding: '10px', backgroundColor: activeIndex2 === 2 ? '#303030' : '#262626' }} onClick={() => setActiveIndex2(2)}>Recrutando</button>
                <button style={{borderRadius: '8px', width: '200px', padding: '10px', backgroundColor: activeIndex2 === 3 ? '#303030' : '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={() => setActiveIndex2(3)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Nova Campanha
                </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1200px'
            }}>
                {campanhas.map((campanha, index) => (
                    <CardCampanha key={index} {...campanha} />
                ))}
            </div>
        </div>
    </div>
  );
}
