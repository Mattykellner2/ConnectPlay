import { Link, useLocation } from "wouter";

export default function PartnerTabs() {
  const [location] = useLocation();
  
  const tabs = [
    { to: "/universities/partner-dashboard", label: "Overview", exact: true },
    { to: "/universities/partner-dashboard/speaking", label: "Speaking Events", exact: false },
    { to: "/universities/partner-dashboard/content", label: "Content Studio", exact: false },
    { to: "/universities/partner-dashboard/earnings", label: "Earnings", exact: false },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location === path;
    }
    return location.startsWith(path);
  };

  return (
    <div className="tabbar" role="tablist" aria-label="University Partner dashboard">
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
