import { Switch, Route } from "wouter";
import "@/styles/speaker.css";
import SpeakerTabs from "@/components/speaker/SpeakerTabs";
import SpeakerStatCard from "@/components/speaker/SpeakerStatCard";
import QuickActions from "@/components/speaker/QuickActions";
import ActivityList from "@/components/speaker/ActivityList";

function SpeakerOverview() {
  return (
    <>
      <div className="sp-grid-4">
        <SpeakerStatCard 
          iconTone="green" 
          value="$12,847" 
          label="Total Revenue" 
          sub="+23% from last year" 
        />
        <SpeakerStatCard 
          iconTone="blue" 
          value="1,943" 
          label="Content Sales" 
          sub="+156 this month" 
        />
        <SpeakerStatCard 
          iconTone="purple" 
          value="28" 
          label="Speaking Events" 
          sub="4 upcoming" 
        />
        <SpeakerStatCard 
          iconTone="amber" 
          value="4.9" 
          label="Average Rating" 
          sub="Excellent feedback" 
        />
      </div>

      <div className="sp-two">
        <QuickActions />
        <ActivityList />
      </div>
    </>
  );
}

function SpeakerEvents() {
  return (
    <div className="empty">
      <h3>Speaking Events</h3>
      <p>No events yet. Create your first event or accept a booking request.</p>
      <button 
        className="btn-primary" 
        onClick={() => (window.location.href = "/speakers/events/new")}
        data-testid="button-create-event"
      >
        + Create Event
      </button>
    </div>
  );
}

function SpeakerContent() {
  return (
    <div className="empty">
      <h3>Content Studio</h3>
      <p>No content yet. Upload your first lesson, workbook, or resource.</p>
      <button 
        className="btn-primary" 
        onClick={() => (window.location.href = "/speakers/content/new")}
        data-testid="button-create-content-studio"
      >
        + Create Content
      </button>
    </div>
  );
}

function SpeakerEarnings() {
  return (
    <div className="empty">
      <h3>Earnings</h3>
      <p>When you start selling content or get paid for events, earnings will appear here.</p>
      <button 
        className="btn-primary" 
        onClick={() => (window.location.href = "/speakers/earnings")}
        data-testid="button-view-payouts"
      >
        View Payouts
      </button>
    </div>
  );
}

export default function SpeakersDashboard() {
  return (
    <div className="speaker-shell">
      <SpeakerTabs />
      <div style={{ marginTop: 14 }}>
        <Switch>
          <Route path="/speakers/dashboard" component={SpeakerOverview} />
          <Route path="/speakers/dashboard/speaking" component={SpeakerEvents} />
          <Route path="/speakers/dashboard/content" component={SpeakerContent} />
          <Route path="/speakers/dashboard/earnings" component={SpeakerEarnings} />
        </Switch>
      </div>
    </div>
  );
}
