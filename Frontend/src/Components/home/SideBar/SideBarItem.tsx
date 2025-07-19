// SidebarItem.tsx
interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  isActive: boolean;
  onClick: () => void;
}
export function SidebarItem({ icon, title, subtitle, isActive, onClick }) {
  return (
    <li
      className={`sidebar-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="icon">{icon}</div>
      <div className="text">
        <span className="title">{title}</span>
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
    </li>
  );
}
