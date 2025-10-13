type Props = { 
  tone: "green" | "blue" | "purple" | "amber"; 
  value?: string; 
  label: string; 
  sub?: string 
};

export default function PartnerStat({ tone, value, label, sub }: Props) {
  return (
    <div className="u-stat">
      <div className={`icon tone-${tone}`}>★</div>
      <div className="value">{value ?? "—"}</div>
      <div className="label">{label}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
