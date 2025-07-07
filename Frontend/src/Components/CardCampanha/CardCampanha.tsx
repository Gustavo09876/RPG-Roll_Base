interface CardCampanhaProps {
  titulo: string;
  mestre: string;
  sistema: string;
  status: 'ATIVA' | 'RECRUTANDO' | 'PAUSADA';
  jogadores: string;
  descricao: string;
  ambientacao: string;
  imagemUrl?: string;
}

export default function CardCampanha({
  titulo,
  mestre,
  sistema,
  status,
  jogadores,
  descricao,
  ambientacao,
  imagemUrl,
}: CardCampanhaProps) {
  const statusColor = {
    ATIVA: '#16a34a',
    RECRUTANDO: '#0ea5e9',
    PAUSADA: '#facc15',
  };

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '10px',
        width: '300px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${imagemUrl ?? 'https://via.placeholder.com/300x120'})`,
          backgroundSize: 'cover',
          height: '120px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '5px',
          padding: '10px',
        }}
      >
        <span style={{ backgroundColor: '#334155', fontSize: '12px', padding: '2px 6px', borderRadius: '5px' }}>
          🎲 {sistema}
        </span>
        <span style={{ backgroundColor: statusColor[status], fontSize: '12px', padding: '2px 6px', borderRadius: '5px' }}>
          {status}
        </span>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px' }}>{titulo}</h3>
          <p style={{ margin: '4px 0', fontSize: '14px' }}>👑 {mestre}</p>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: '#cbd5e1' }}>👥 {jogadores}</p>
        <p style={{ fontSize: '13px', color: '#cbd5e1' }}>{descricao}</p>
        <p style={{ fontSize: '14px' }}>✨ {ambientacao}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              flex: 1,
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ▶ Entrar na Mesa
          </button>
          <button
            style={{
              width: '40px',
              backgroundColor: '#f1f5f9',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
}
