import { CalendarDays, Clock, Users, Settings, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Ama = {
  id: string;
  status: "Upcoming" | "Completed";
  title: string;
  host: { name: string; title: string; avatar?: string };
  summary: string;
  tags: string[];
  date: string;
  time: string;
  attendees: string;
  variant?: "join" | "manage";
};

export default function AmaCard({ ama }: { ama: Ama }) {
  const { toast } = useToast();

  const handleCTA = () => {
    if (ama.variant === "manage") {
      toast({
        title: "Manage AMA",
        description: `Managing "${ama.title}". In production, this would open the management interface.`,
      });
    } else {
      toast({
        title: "Joining Meeting",
        description: `Preparing to join "${ama.title}". In production, this would launch the video conference.`,
      });
    }
  };

  return (
    <article className="card" data-testid={`ama-card-${ama.id}`}>
      <span className="status" data-testid={`status-${ama.id}`}>{ama.status}</span>

      <div className="card-title" data-testid={`title-${ama.id}`}>{ama.title}</div>

      <div className="host">
        <img
          src={ama.host.avatar || "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&auto=format"}
          alt={ama.host.name}
        />
        <div>
          <div style={{ fontWeight: 800 }}>{ama.host.name}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{ama.host.title}</div>
        </div>
      </div>

      <div style={{ color: "#6B7280" }}>{ama.summary}</div>

      <div className="badges">
        {ama.tags.map((t, i) => (
          <span key={i} className="badge">
            {t}
          </span>
        ))}
      </div>

      <div className="meta">
        <div data-testid={`date-${ama.id}`}>
          <CalendarDays className="w-4 h-4" /> {ama.date}
        </div>
        <div data-testid={`time-${ama.id}`}>
          <Clock className="w-4 h-4" /> {ama.time}
        </div>
        <div data-testid={`attendees-${ama.id}`}>
          <Users className="w-4 h-4" /> {ama.attendees}
        </div>
      </div>

      <div>
        {ama.variant === "manage" ? (
          <button
            className="cta secondary"
            onClick={handleCTA}
            data-testid={`button-manage-${ama.id}`}
          >
            <Settings className="w-4 h-4" />
            Manage
          </button>
        ) : (
          <button
            className="cta"
            onClick={handleCTA}
            data-testid={`button-join-${ama.id}`}
          >
            <ExternalLink className="w-4 h-4" />
            Join Meeting
          </button>
        )}
      </div>
    </article>
  );
}
