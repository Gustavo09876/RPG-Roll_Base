import { useEffect } from "react";

export default function ChatWrapper({ children }) {
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest(".dado-rolado");
      if (!el) return;

      const existente = document.querySelector(".dado-tooltip");
      if (existente) existente.remove();

      const div = document.createElement("div");
      div.className = "dado-tooltip";
      div.textContent = el.getAttribute("data-expressao");

      Object.assign(div.style, {
        position: "absolute",
        backgroundColor: "#303030",
        color: "white",
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "0.875rem",
        whiteSpace: "nowrap",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        zIndex: "1000",
        pointerEvents: "none", // para que clique não seja bloqueado
      });

      document.body.appendChild(div);

      const rect = el.getBoundingClientRect();
      const tooltipWidth = div.offsetWidth;
      const tooltipHeight = div.offsetHeight;

      let top = rect.top - tooltipHeight - 10;
      let left = rect.left;

      if (left < 5) left = 5;
      if (left + tooltipWidth > window.innerWidth - 5) {
        left = window.innerWidth - tooltipWidth - 5;
      }
      if (top < 5) {
        top = rect.bottom + 10;
      }

      div.style.top = `${top + window.scrollY}px`;
      div.style.left = `${left + window.scrollX}px`;

      const remove = (event) => {
        if (!div.contains(event.target) && event.target !== el) {
          div.remove();
          document.removeEventListener("click", remove);
        }
      };
      setTimeout(() => document.addEventListener("click", remove), 0);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
