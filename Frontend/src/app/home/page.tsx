'use client';

import { useState } from "react";

export default function HomePage() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div style={{ backgroundColor: '#212121', height: '100vh', display: 'flex' }}>
        <div className="sidebar" style={{ width: '250px', backgroundColor: '#181818', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div className="logo" style={{ padding: '20px', display: 'flex'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dice6-icon lucide-dice-6"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01"/><path d="M16 12h.01"/><path d="M16 16h.01"/><path d="M8 8h.01"/><path d="M8 12h.01"/><path d="M8 16h.01"/></svg>
                <h1 style={{ fontSize: '24px', margin: '10px 0' }}>RPG Roll</h1>
            </div>
            <nav className="navigation" style={{ padding: '20px', borderTop: '1px solid white' }}>
                <h1 style={{ fontSize: '16px', marginBottom: '20px',  }}>NAVEGAÇÃO</h1>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {/* Home Page */}
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: activeIndex === 0 ? '#242424' : 'transparent', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}
                        onClick={() => setActiveIndex(0)}>
                        <div style={{ marginRight: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Início</a>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Visão geral</a>
                        </div>
                    </li>
                    {/* Nova Campanha */}
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: activeIndex === 1 ? '#242424' : 'transparent', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}
                        onClick={() => setActiveIndex(1)}>
                        <div style={{ marginRight: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Nova Campanha</a>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Criar Mesa</a>
                        </div>
                    </li>
                    {/* Configurações */}
                    <li style={{display: 'flex', alignItems: 'center', marginBottom: '20px', backgroundColor: activeIndex === 2 ? '#242424' : 'transparent', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}
                        onClick={() => setActiveIndex(2)}>
                        <div style={{ marginRight: '10px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Configurações</a>
                            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '12px' }}>Perfil e Preferencias</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="content" style={{ flex: 1, padding: '20px', color: '#fff' }}>

        </div>
    </div>
  );
}
