import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Search, Plus, Mic } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import "../styles/events.css";
import "../styles/dashboard.css";
import AmaTabs, { AmaTabKey } from "../components/events/AmaTabs";
import AmaCard from "../components/events/AmaCard";

const ALL = [
  {
    id: "1",
    status: "Completed" as const,
    title: "Breaking Into Sports Marketing: From Intern to Director",
    host: { name: "Sarah Chen", title: "Senior Marketing Director, ESPN" },
    summary: "Honest discussion about climbing the sports marketing ladder.",
    tags: ["Career Development", "Sports Marketing", "Networking", "+1 more"],
    date: "Apr 15, 2024",
    time: "3:00 PM (75 min)",
    attendees: "67 registered · 100 max",
    variant: "join" as const,
  },
  {
    id: "2",
    status: "Completed" as const,
    title: "Stanford Sports Media Program - Q&A for Prospective Students",
    host: { name: "Dr. Jennifer Martinez", title: "Professor, Stanford University" },
    summary: "Learn about curriculum, career outcomes, and admission requirements.",
    tags: ["Education", "Graduate Programs", "Sports Media"],
    date: "Apr 10, 2024",
    time: "1:00 PM (45 min)",
    attendees: "38 registered · 50 max",
    variant: "join" as const,
  },
];

const RSVPS = [ALL[0]];
const MYAMAS = [
  {
    ...ALL[1],
    variant: "manage" as const,
  },
];

export default function EventsAma() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<AmaTabKey>("discover");
  const [q, setQ] = useState("");

  const source = tab === "discover" ? ALL : tab === "rsvps" ? RSVPS : MYAMAS;

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return source;
    return source.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.summary.toLowerCase().includes(term) ||
        a.tags.join(" ").toLowerCase().includes(term) ||
        a.host.name.toLowerCase().includes(term)
    );
  }, [q, source]);

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div className="ev-wrap">
          <div className="ev-topbar">
            <div>
              <h1 className="ev-title">Ask Me Anything</h1>
              <div className="ev-sub">
                Join live sessions with industry experts and thought leaders.
              </div>
            </div>
            <button
              className="ev-host"
              onClick={() => setLocation("/universities/dashboard/events/new")}
              data-testid="button-host-ama"
            >
              <Plus className="w-4 h-4" />
              Host AMA
            </button>
          </div>

          <div className="ev-searchbar">
            <div className="ev-search">
              <Search className="icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search AMAs by topic, host, or keyword..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search AMAs"
                data-testid="input-search-ama"
              />
            </div>
          </div>

          <AmaTabs
            active={tab}
            counts={{ rsvps: RSVPS.length, my: MYAMAS.length }}
            onChange={setTab}
          />

          {list.length === 0 ? (
            <div className="empty" data-testid="empty-state">
              <div className="mic">
                <Mic className="w-12 h-12 opacity-45" />
              </div>
              <div style={{ fontWeight: 900, color: "#475569" }}>No AMAs Found</div>
              <div>Check back soon for new sessions or adjust your search.</div>
            </div>
          ) : (
            <div className="ev-grid">
              {list.map((a) => (
                <AmaCard key={a.id} ama={a as any} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
