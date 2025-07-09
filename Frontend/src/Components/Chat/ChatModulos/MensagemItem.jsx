export default function MensagemItem({ msg, anterior, setImagemAmpliada }) {
  const mesmaPessoa = anterior && anterior.autor === msg.autor;

  return (
    <div
      key={msg.id}
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: !mesmaPessoa ? "30px" : "3px",
        alignSelf: "flex-end",
        maxWidth: "100%",
        width: "100%",
        paddingRight: "15px",
        paddingLeft: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "flex-end",
          flexDirection: "column",
          color: "#fff",
          paddingLeft: "15px",
          maxWidth: "90%",
          minWidth: !mesmaPessoa ? "60%" : "10%",
        }}
      >
        {/* Top */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Nome o user */}
          {!mesmaPessoa && (
            <>
              {/* Horario */}
              <span
                style={{
                  display: "flex",
                  fontSize: "12px",
                  color: "#d1d5db",
                  width: "15%",
                  alignItems: "center",
                }}
              >
                {msg.horario}
              </span>
              <br />
              {/* User */}
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-end",
                  width: "85%",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "#fff",
                  backgroundColor: "#1E40AF",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  padding: "8px 15px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    width: "50%",
                  }}
                >
                  <strong>{msg.autor}</strong>
                  <br />
                </div>
                {/* Icone de Usuario */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "50%",
                    justifyContent: "flex-end",
                    position: "absolute",
                    top: "-50%",
                    right: "10px",
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
                      width: "35px",
                      height: "35px",
                      fontWeight: "bold",
                    }}
                  >
                    {msg.icon}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Texto */}
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#3B82F6",
            wordBreak: "break-word",
            padding: "10px 15px",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            borderTopLeftRadius: mesmaPessoa ? "15px" : "0",
            borderTopRightRadius: mesmaPessoa ? "15px" : "0",
            borderTop: !mesmaPessoa ? "" : "4px solid #1E40AF",
          }}
        >
          {msg.imagem && (
            <img
              src={msg.imagem}
              alt="imagem"
              onClick={() => setImagemAmpliada(msg.imagem)}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            />
          )}
          {msg.texto && (
            <div
              className="break-words text-white"
              dangerouslySetInnerHTML={{ __html: msg.texto }}
            />
          )}
        </span>
      </div>
    </div>
  );
}
