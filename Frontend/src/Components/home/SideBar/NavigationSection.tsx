// NavigationSection.tsx
import { SidebarItem } from "./SideBarItem"; // ou o caminho correto

interface NavigationSectionProps {
  title: string;
  items: Array<{
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onClick: () => void;
    isActive: boolean;
  }>;
}
export function NavigationSection({ title, items }) {
  return (
    <nav className="navigation-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          <SidebarItem key={i} {...item} />
        ))}
      </ul>
    </nav>
  );
}
