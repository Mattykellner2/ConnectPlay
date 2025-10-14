import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Opt = { label: string; value: string };

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  minWidth = 160
}: {
  label: string;
  value: string;
  options: Opt[];
  onChange: (v: string) => void;
  minWidth?: number
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = options.find(o => o.value === value)?.label ?? label;

  return (
    <div className="cl-filter" ref={ref} style={{ minWidth }}>
      <button
        type="button"
        className="cl-filter-btn"
        onClick={() => setOpen(!open)}
        data-testid={`filter-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>{current}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="cl-menu" role="menu" aria-label={label}>
          {options.map(o => (
            <div
              key={o.value}
              className={`opt ${o.value === value ? "active" : ""}`}
              role="menuitem"
              onClick={() => { onChange(o.value); setOpen(false); }}
              data-testid={`option-${o.value}`}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
