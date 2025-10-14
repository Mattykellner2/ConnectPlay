import { Link, useLocation } from "wouter";
import { Home, BarChart3, Mic2, Library, Calendar, MessageSquare, Link as LinkIcon, Settings } from "lucide-react";

const items = [
  { path: "/universities/dashboard/home", label: "Home Page", icon: Home },
  { path: "/universities/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/universities/dashboard/speakers", label: "My Speakers", icon: Mic2 },
  { path: "/universities/dashboard/content", label: "Content Library", icon: Library },
  { path: "/universities/dashboard/events", label: "Events", icon: Calendar },
  { path: "/universities/dashboard/messages", label: "Messages", icon: MessageSquare },
  { path: "/universities/dashboard/connect", label: "Speaker Connect", icon: LinkIcon },
  { path: "/universities/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [pathname] = useLocation();
  
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="/brand/connectplay-mark.svg" width={28} height={28} alt="ConnectPlay" />
        <div>ConnectPlay</div>
      </div>
      <div className="portal-label">University Portal</div>

      <div className="section-label">Quick Access</div>
      <Link 
        href="/" 
        className={`nav-item ${pathname === "/" ? "active" : ""}`}
        data-testid="nav-home"
      >
        <Home size={18} />
        <span className="label">Home Page</span>
      </Link>

      <div className="section-label">Navigation</div>
      {items.slice(1).map(it => {
        const Icon = it.icon;
        return (
          <Link 
            key={it.path} 
            href={it.path} 
            className={`nav-item ${pathname === it.path ? "active" : ""}`}
            data-testid={`nav-${it.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <Icon size={18} />
            <span className="label">{it.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
