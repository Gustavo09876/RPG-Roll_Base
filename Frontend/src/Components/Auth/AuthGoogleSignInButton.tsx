"use client";
export function GoogleSigninButton() {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 10,
        backgroundColor: "#2a2a2d",
        border: "1px solid #444",
        borderRadius: 8,
        color: "#f5f5f5",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 24,
      }}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        style={{ width: 20, height: 20, marginRight: 8 }}
      />
      Cadastrar com o Google
    </button>
  );
}
