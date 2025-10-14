import { Link, useLocation } from "wouter";

type Tab = { to: string; label: string; testId: string; };

const tabs: Tab[] = [
  { to: "/universities/dashboard", label: "Overview", testId: "tab-overview" },
  { to: "/universities/dashboard/speakers", label: "Guest Speakers", testId: "tab-speakers" },
  { to: "/universities/dashboard/students", label: "Student Management", testId: "tab-students" },
  { to: "/universities/dashboard/professors", label: "Professors", testId: "tab-professors" },
  { to: "/universities/dashboard/access-codes", label: "Access Codes", testId: "tab-codes" },
];

export default function Tabs() {
  const [pathname] = useLocation();
  
  return (
    <div className="tabbar" role="tablist" aria-label="Dashboard sections">
      {tabs.map(t => {
        const isActive = t.to === "/universities/dashboard" 
          ? pathname === "/universities/dashboard"
          : pathname.startsWith(t.to);
        
        return (
          <Link
            key={t.to}
            href={t.to}
            className={`tab ${isActive ? "active" : ""}`}
            role="tab"
            aria-selected={isActive}
            data-testid={t.testId}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
