type Props = {
  icon?: React.ReactNode;
  iconTone: "green" | "blue" | "purple" | "amber";
  value: string;
  label: string;
  sub?: string;
};

export default function SpeakerStatCard({icon, iconTone, value, label, sub}: Props) {
  return (
    <div className="stat">
      <div className={`icon icon-${iconTone}`}>{icon ?? "$"}</div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
