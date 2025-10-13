import { Users, Mic2, GraduationCap, TrendingUp } from "lucide-react";

type Props = { 
  label: string; 
  value: string; 
  delta?: string; 
  iconBg: "red" | "green" | "purple" | "amber";
  iconType?: "users" | "speakers" | "cohorts" | "engagement";
};

const iconMap = {
  users: Users,
  speakers: Mic2,
  cohorts: GraduationCap,
  engagement: TrendingUp,
};

export default function StatCard({ label, value, delta, iconBg, iconType = "users" }: Props) {
  const map = { red: "icon-red", green: "icon-green", purple: "icon-purple", amber: "icon-amber" } as const;
  const Icon = iconMap[iconType];
  
  return (
    <div className="stat">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className={`icon ${map[iconBg]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {delta && <span className="delta">{delta}</span>}
      </div>
    </div>
  );
}
