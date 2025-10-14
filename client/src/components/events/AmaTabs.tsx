import { Search, Calendar, Mic } from "lucide-react";

export type AmaTabKey = "discover" | "rsvps" | "myamas";

export default function AmaTabs({
  active,
  counts,
  onChange
}: {
  active: AmaTabKey;
  counts?: { rsvps?: number; my?: number };
  onChange: (k: AmaTabKey) => void;
}) {
  return (
    <div className="ev-tabs" role="tablist" aria-label="AMA tabs">
      <button
        className={`ev-tab ${active === "discover" ? "active" : ""}`}
        role="tab"
        aria-selected={active === "discover"}
        onClick={() => onChange("discover")}
        data-testid="tab-discover"
      >
        <Search className="w-4 h-4" />
        Discover AMAs
      </button>
      <button
        className={`ev-tab ${active === "rsvps" ? "active" : ""}`}
        role="tab"
        aria-selected={active === "rsvps"}
        onClick={() => onChange("rsvps")}
        data-testid="tab-rsvps"
      >
        <Calendar className="w-4 h-4" />
        My RSVPs{typeof counts?.rsvps === "number" ? ` (${counts.rsvps})` : ""}
      </button>
      <button
        className={`ev-tab ${active === "myamas" ? "active" : ""}`}
        role="tab"
        aria-selected={active === "myamas"}
        onClick={() => onChange("myamas")}
        data-testid="tab-myamas"
      >
        <Mic className="w-4 h-4" />
        My AMAs{typeof counts?.my === "number" ? ` (${counts.my})` : ""}
      </button>
    </div>
  );
}
