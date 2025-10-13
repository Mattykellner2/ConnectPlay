import { Switch, Route } from "wouter";
import "@/styles/partner.css";
import PartnerTabs from "@/components/partner/PartnerTabs";
import PartnerHero from "@/components/partner/PartnerHero";
import PartnerStat from "@/components/partner/PartnerStat";
import PartnerQuickActions from "@/components/partner/PartnerQuickActions";
import PartnerActivity from "@/components/partner/PartnerActivity";

const currentUser = { 
  name: (window as any)?.userName || "", 
  title: (window as any)?.userTitle || "", 
  avatarUrl: (window as any)?.userAvatar || "" 
};

function PartnerOverview() {
  return (
    <>
      <PartnerHero 
        name={currentUser.name} 
        title={currentUser.title} 
        avatarUrl={currentUser.avatarUrl} 
      />

      <div className="u-grid-4">
        <PartnerStat tone="green" value="—" label="Total Revenue" sub="+% vs last year" />
        <PartnerStat tone="blue" value="—" label="Content Sales" sub="+ this month" />
        <PartnerStat tone="purple" value="—" label="Speaking Events" sub="upcoming" />
        <PartnerStat tone="amber" value="—" label="Average Rating" sub="feedback" />
      </div>

      <PartnerTabs />

      <div className="u-two">
        <PartnerQuickActions />
        <PartnerActivity />
      </div>
    </>
  );
}

function PartnerSpeaking() {
  return (
    <>
      <PartnerHero 
        name={currentUser.name} 
        title={currentUser.title} 
        avatarUrl={currentUser.avatarUrl} 
      />
      <div className="u-grid-4">
        <PartnerStat tone="green" label="Total Revenue" />
        <PartnerStat tone="blue" label="Content Sales" />
        <PartnerStat tone="purple" label="Speaking Events" />
        <PartnerStat tone="amber" label="Average Rating" />
      </div>
      <PartnerTabs />
      <div className="empty">
        <h3>Upcoming Speaking Events</h3>
        <p>No events scheduled yet. Create or approve bookings to see them here.</p>
        <button 
          className="btn-primary" 
          onClick={() => (window.location.href = "/universities/events/new")}
          data-testid="button-create-event-partner"
        >
          + Create Event
        </button>
      </div>
    </>
  );
}

function PartnerContent() {
  return (
    <>
      <PartnerHero 
        name={currentUser.name} 
        title={currentUser.title} 
        avatarUrl={currentUser.avatarUrl} 
      />
      <div className="u-grid-4">
        <PartnerStat tone="green" label="Total Revenue" />
        <PartnerStat tone="blue" label="Content Sales" />
        <PartnerStat tone="purple" label="Speaking Events" />
        <PartnerStat tone="amber" label="Average Rating" />
      </div>
      <PartnerTabs />
      <div className="empty">
        <h3>Content Performance</h3>
        <p>No content yet. Start publishing materials for your university community.</p>
        <button 
          className="btn-primary" 
          onClick={() => (window.location.href = "/universities/partner-dashboard/content/new")}
          data-testid="button-create-new-partner"
        >
          + Create New
        </button>
      </div>
    </>
  );
}

function PartnerEarnings() {
  return (
    <>
      <PartnerHero 
        name={currentUser.name} 
        title={currentUser.title} 
        avatarUrl={currentUser.avatarUrl} 
      />
      <div className="u-grid-4">
        <PartnerStat tone="green" label="Total Revenue" />
        <PartnerStat tone="blue" label="Content Sales" />
        <PartnerStat tone="purple" label="Speaking Events" />
        <PartnerStat tone="amber" label="Average Rating" />
      </div>
      <PartnerTabs />
      <div className="empty">
        <h3>Earnings Overview</h3>
        <p>When transactions occur, earnings and trends will appear here.</p>
        <button 
          className="btn-primary" 
          onClick={() => (window.location.href = "/universities/earnings")}
          data-testid="button-view-analytics-partner"
        >
          View Detailed Analytics
        </button>
      </div>
    </>
  );
}

export default function UniversityPartnerDashboard() {
  return (
    <div className="u-shell">
      <Switch>
        <Route path="/universities/partner-dashboard" component={PartnerOverview} />
        <Route path="/universities/partner-dashboard/speaking" component={PartnerSpeaking} />
        <Route path="/universities/partner-dashboard/content" component={PartnerContent} />
        <Route path="/universities/partner-dashboard/earnings" component={PartnerEarnings} />
      </Switch>
    </div>
  );
}
