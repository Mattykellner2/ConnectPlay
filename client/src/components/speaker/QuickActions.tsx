export default function QuickActions() {
  const go = (p: string) => (window.location.href = p);
  
  return (
    <div className="panel">
      <h3>Quick Actions</h3>
      <div className="q-act">
        <button className="q-btn" onClick={() => go("/speakers/calendar")} data-testid="button-view-calendar">
          🗓️ View Calendar
        </button>
        <button className="q-btn" onClick={() => go("/speakers/content/new")} data-testid="button-create-content">
          📖 Create Content
        </button>
        <button className="q-btn" onClick={() => go("/speakers/earnings")} data-testid="button-view-earnings">
          💲 View Earnings
        </button>
        <button className="q-btn" onClick={() => go("/speakers/profile")} data-testid="button-manage-profile">
          👥 Manage Profile
        </button>
      </div>
    </div>
  );
}
