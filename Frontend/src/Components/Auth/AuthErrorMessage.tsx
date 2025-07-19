"use client";

export function ErrorMessage({ message }) {
  return (
    <div
      style={{
        color: "red",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "14px",
      }}
    >
      {message}
    </div>
  );
}
