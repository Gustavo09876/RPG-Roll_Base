"use client";
import React from "react";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function AuthButton({ label, style, ...props }: AuthButtonProps) {
  return (
    <button
      style={{
        backgroundColor: "#0f62fe",
        color: "#fff",
        width: "100%",
        padding: 10,
        borderRadius: 8,
        fontWeight: 600,
        border: "none",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      {label}
    </button>
  );
}
