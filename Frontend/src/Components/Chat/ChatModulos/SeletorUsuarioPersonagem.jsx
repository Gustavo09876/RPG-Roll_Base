"use client";

export default function SeletorUsuarioPersonagem({
  usuarios,
  setPersonagemIndex,
  toggleMenu,
  usuarioIndex,
}) {
  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        color: "#fff",
        flexDirection: "row",
        position: "fixed",
        top: "70%",
        height: "15%",
        width: "100%",
        backgroundColor: "transparent",
        alignItems: "center",
        gap: "20px",
        overflowX: "auto",
      }}
    >
      {/* Usuário */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            color: "#fff",
            backgroundColor: "#181818",
            borderRadius: "15px",
            padding: "10px 15px",
            width: "50px",
          }}
        >
          Eu
        </div>
        <button
          onClick={() => {
            setPersonagemIndex(
              usuarios[usuarioIndex].Personagens.findIndex((p) => p === "null")
            );
            toggleMenu();
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "white",
                backgroundColor: "#181818",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                fontWeight: "bold",
              }}
            >
              <span>{usuarios[usuarioIndex].name.charAt(0)}</span>
            </div>
          </div>
        </button>
      </div>

      {/* GM */}
      {usuarios[usuarioIndex].Function === "GM" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: "#181818",
              borderRadius: "15px",
              padding: "10px 15px",
              width: "50px",
            }}
          >
            GM
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              onClick={() => {
                setPersonagemIndex(
                  usuarios[usuarioIndex].Personagens.findIndex(
                    (p) => p === "GM"
                  )
                );
                toggleMenu();
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "white",
                  backgroundColor: "#181818",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  fontWeight: "bold",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 7v14" />
                  <path d="M16 12h2" />
                  <path d="M16 8h2" />
                  <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
                  <path d="M6 12h2" />
                  <path d="M6 8h2" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Personagens */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            color: "#fff",
            backgroundColor: "#181818",
            borderRadius: "15px",
            padding: "10px 15px",
            width: "100px",
          }}
        >
          Personagens
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {usuarios[usuarioIndex].Personagens.map((p, index) => {
            if (p === "null" || p === "GM") return null;

            return (
              <button
                key={index}
                onClick={() => {
                  setPersonagemIndex(index);
                  toggleMenu();
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "white",
                  backgroundColor: "#181818",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  fontWeight: "bold",
                  border: "none",
                }}
              >
                <span>{p.charAt(0)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
