"use client";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#1c1c1e",
        width: 380,
        padding: 32,
        borderRadius: 12,
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      {children}
    </div>
  );
}
