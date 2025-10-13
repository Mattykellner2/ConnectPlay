export default function PartnerQuickActions() {
  const go = (p: string) => (window.location.href = p);
  
  return (
    <div className="panel">
      <h3>Quick Actions</h3>
      <div className="q-grid">
        <button className="q-btn" onClick={() => go("/universities/calendar")} data-testid="button-view-calendar-partner">
          🗓️ View Calendar
        </button>
        <button className="q-btn" onClick={() => go("/universities/partner-dashboard/content/new")} data-testid="button-create-content-partner">
          📖 Create Content
        </button>
        <button className="q-btn" onClick={() => go("/universities/earnings")} data-testid="button-view-earnings-partner">
          💲 View Earnings
        </button>
        <button className="q-btn" onClick={() => go("/universities/profile")} data-testid="button-manage-profile-partner">
          👥 Manage Profile
        </button>
      </div>
    </div>
  );
}
