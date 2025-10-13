import { Link, useLocation } from "wouter";

export default function SpeakerTabs() {
  const [location] = useLocation();
  
  const tabs = [
    { to: "/speakers/dashboard", label: "Overview", exact: true },
    { to: "/speakers/dashboard/speaking", label: "Speaking Events", exact: false },
    { to: "/speakers/dashboard/content", label: "Content Studio", exact: false },
    { to: "/speakers/dashboard/earnings", label: "Earnings", exact: false },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location === path;
    }
    return location.startsWith(path);
  };

  return (
    <div className="tabbar" role="tablist" aria-label="Speaker dashboard">
      {tabs.map((t) => (
        <Link
          key={t.to}
          href={t.to}
          className={`tab ${isActive(t.to, t.exact) ? "active" : ""}`}
          data-testid={`tab-${t.label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}
