import { Calendar, BookOpen, DollarSign, Users } from "lucide-react";

export default function PartnerQuickActions() {
  const go = (p: string) => (window.location.href = p);
  
  return (
    <div className="panel">
      <h3>Quick Actions</h3>
      <div className="q-grid">
        <button className="q-btn" onClick={() => go("/universities/calendar")} data-testid="button-view-calendar-partner">
          <Calendar className="w-5 h-5" />
          View Calendar
        </button>
        <button className="q-btn" onClick={() => go("/universities/partner-dashboard/content/new")} data-testid="button-create-content-partner">
          <BookOpen className="w-5 h-5" />
          Create Content
        </button>
        <button className="q-btn" onClick={() => go("/universities/earnings")} data-testid="button-view-earnings-partner">
          <DollarSign className="w-5 h-5" />
          View Earnings
        </button>
        <button className="q-btn" onClick={() => go("/universities/profile")} data-testid="button-manage-profile-partner">
          <Users className="w-5 h-5" />
          Manage Profile
        </button>
      </div>
    </div>
  );
}
