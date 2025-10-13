import { Building2 } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="header-card">
      <div className="header-left">
        <div className="header-badge">
          <Building2 size={28} />
        </div>
        <div>
          <div className="header-title">The Ohio State University</div>
          <div className="header-sub">Fisher College of Business • University Dashboard</div>
          <div className="header-sub">Welcome back, Dr. Jennifer Martinez</div>
        </div>
      </div>
      <div style={{ opacity: 0.9 }}>
        <Building2 size={32} />
      </div>
    </div>
  );
}
