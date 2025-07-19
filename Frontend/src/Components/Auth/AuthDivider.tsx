// Components/Auth/AuthDivider.tsx

export function AuthDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "16px 0",
        color: "#666",
        fontSize: 12,
      }}
    >
      <div style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
      <span style={{ margin: "0 12px" }}>OU</span>
      <div style={{ flex: 1, height: 1, backgroundColor: "#333" }} />
    </div>
  );
}
