"use client";

import React, { InputHTMLAttributes, RefObject } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: RefObject<HTMLInputElement | null>;
  style?: React.CSSProperties;
}

export function InputField({
  type,
  placeholder,
  inputRef,
  style,
  ...props
}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={inputRef}
      style={{
        width: "100%",
        padding: 10,
        backgroundColor: "#2a2a2d",
        border: "1px solid #444",
        borderRadius: 8,
        marginBottom: 16,
        color: "#f5f5f5",
        fontSize: 14,
        ...style,
      }}
      {...props}
    />
  );
}
