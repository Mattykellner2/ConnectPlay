import { Switch, Route, Link, useLocation } from "wouter";
import "@/styles/speaker.css";
import { 
  DollarSign, 
  BookOpen, 
  Mic2, 
  Star, 
  Plus, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Settings, 
  MessageSquare,
  LayoutDashboard,
  Eye,
  MapPin,
  Video,
  Building
} from "lucide-react";

// Dummy user data (to be replaced with real data)
const dummyUser = {
  fullName: "Dr. Sarah Martinez",
  title: "Marketing Professor",
  company: "Stanford GSB",
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
};

// Sidebar Component
function SpeakerSidebar() {
  const [location] = useLocation();
  
  const navItems = [
    { path: "/speakers/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
    { path: "/speakers/dashboard/speaking", label: "Speaking Events", icon: Mic2, exact: false },
    { path: "/speakers/dashboard/content", label: "Content Studio", icon: FileText, exact: false },
    { path: "/speakers/dashboard/earnings", label: "Earnings", icon: TrendingUp, exact: false },
    { path: "/speakers/dashboard/messages", label: "Messages", icon: MessageSquare, exact: false },
    { path: "/speakers/settings", label: "Settings", icon: Settings, exact: false },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location === path;
    return location.startsWith(path);
  };

  return (
    <aside className="speaker-sidebar">
      <Link href="/speakers/dashboard" className="speaker-brand" data-testid="link-speaker-logo">
        <img src="/brand/connectplay-mark.svg" width={32} height={32} alt="ConnectPlay" />
        <span>ConnectPlay</span>
      </Link>

      <div className="speaker-nav-section">
        <div className="speaker-section-label">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`speaker-nav-item ${isActive(item.path, item.exact) ? "active" : ""}`}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

// Profile Header Component
function ProfileHeader() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="profile-header">
      <div className="profile-info">
        <img 
          src={dummyUser.profilePhoto} 
          alt={dummyUser.fullName}
          className="profile-photo"
          data-testid="img-profile-photo"
        />
        <div>
          <h2 className="profile-welcome" data-testid="text-welcome">
            Welcome back, {dummyUser.fullName}
          </h2>
          <p className="profile-subtitle" data-testid="text-user-title">
            {dummyUser.title} at {dummyUser.company}
          </p>
        </div>
        <span className="profile-badge" data-testid="badge-industry-expert">Industry Expert</span>
      </div>
      <button 
        className="btn-create-content" 
        onClick={() => setLocation("/speakers/content/new")}
        data-testid="button-create-content"
      >
        <Plus size={18} />
        Create Content
      </button>
    </div>
  );
}

// KPI Cards Component
function KPICards() {
  const kpis = [
    { 
      icon: <DollarSign size={24} />, 
      iconTone: "green", 
      value: "$12,847", 
      label: "Total Revenue", 
      sub: "+23% from last year" 
    },
    { 
      icon: <BookOpen size={24} />, 
      iconTone: "blue", 
      value: "1,943", 
      label: "Content Sales", 
      sub: "+156 this month" 
    },
    { 
      icon: <Mic2 size={24} />, 
      iconTone: "purple", 
      value: "28", 
      label: "Speaking Events", 
      sub: "4 upcoming" 
    },
    { 
      icon: <Star size={24} />, 
      iconTone: "amber", 
      value: "4.9", 
      label: "Average Rating", 
      sub: "Excellent feedback" 
    },
  ];

  return (
    <div className="kpi-grid">
      {kpis.map((kpi, index) => (
        <div className="kpi-card" key={index} data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className={`kpi-icon icon-${kpi.iconTone}`}>
            {kpi.icon}
          </div>
          <div className="kpi-value" data-testid={`value-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}>
            {kpi.value}
          </div>
          <div className="kpi-label">{kpi.label}</div>
          <div className="kpi-sub">{kpi.sub}</div>
        </div>
      ))}
    </div>
  );
}

// Tab Bar Component
function TabBar() {
  const [location] = useLocation();
  
  const tabs = [
    { path: "/speakers/dashboard", label: "Overview", exact: true },
    { path: "/speakers/dashboard/speaking", label: "Speaking Events", exact: false },
    { path: "/speakers/dashboard/content", label: "Content Studio", exact: false },
    { path: "/speakers/dashboard/earnings", label: "Earnings", exact: false },
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) return location === path;
    return location.startsWith(path);
  };

  return (
    <div className="tab-bar" role="tablist">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={`tab-item ${isActive(tab.path, tab.exact) ? "active" : ""}`}
          data-testid={`tab-${tab.label.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

// Overview Tab Component
function OverviewTab() {
  const [, setLocation] = useLocation();
  
  const quickActions = [
    { label: "View Calendar", icon: <Calendar size={20} />, path: "/speakers/calendar" },
    { label: "Create Content", icon: <Plus size={20} />, path: "/speakers/content/new" },
    { label: "View Earnings", icon: <DollarSign size={20} />, action: "earnings" },
    { label: "Manage Profile", icon: <Settings size={20} />, path: "/speakers/settings" },
  ];

  const recentActivity = [
    { text: 'Alex Johnson purchased "Sponsorship Deck Masterclass"', time: '2 hours ago' },
    { text: 'New speaking request from UCLA Extension', time: '1 day ago' },
    { text: 'New message from Maria Garcia', time: '2 days ago' },
    { text: 'Content "Digital Marketing Playbook" reached 500 views', time: '3 days ago' },
  ];

  const handleAction = (item: typeof quickActions[0]) => {
    if (item.action === "earnings") {
      setLocation("/speakers/dashboard/earnings");
    } else if (item.path) {
      setLocation(item.path);
    }
  };

  return (
    <div className="overview-content">
      <div className="overview-grid">
        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
                onClick={() => handleAction(action)}
                data-testid={`button-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="action-icon">{action.icon}</div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="recent-activity-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div className="activity-item" key={index} data-testid={`activity-${index}`}>
                <div className="activity-content">
                  <span className="activity-dot" />
                  <span className="activity-text">{activity.text}</span>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Speaking Events Tab Component
function SpeakingEventsTab() {
  const [, setLocation] = useLocation();
  
  const upcomingEvents = [
    {
      title: "Sports Marketing Guest Lecture",
      host: "Ohio State University",
      institution: "Fisher College of Business",
      date: "March 15, 2025",
      type: "in-person",
      price: "$2,500",
    },
    {
      title: "Digital Transformation Workshop",
      host: "UC Berkeley",
      institution: "Haas School of Business",
      date: "March 22, 2025",
      type: "virtual",
      price: "$1,800",
    },
    {
      title: "Brand Strategy Masterclass",
      host: "University of Michigan",
      institution: "Ross School of Business",
      date: "April 5, 2025",
      type: "in-person",
      price: "$3,200",
    },
  ];

  return (
    <div className="events-content">
      <div className="events-header">
        <h2>Upcoming Speaking Events</h2>
        <span className="events-badge" data-testid="badge-events-count">
          {upcomingEvents.length} scheduled
        </span>
      </div>

      <div className="events-list">
        {upcomingEvents.map((event, index) => (
          <div className="event-card" key={index} data-testid={`event-${index}`}>
            <div className="event-icon">
              <Building size={24} />
            </div>
            <div className="event-details">
              <h4 className="event-title">{event.title}</h4>
              <p className="event-host">{event.host} · {event.institution}</p>
              <div className="event-tags">
                <span className="event-tag" data-testid={`event-date-${index}`}>
                  <Calendar size={14} />
                  {event.date}
                </span>
                <span className={`event-tag ${event.type}`} data-testid={`event-type-${index}`}>
                  {event.type === "virtual" ? <Video size={14} /> : <MapPin size={14} />}
                  {event.type}
                </span>
              </div>
            </div>
            <div className="event-actions">
              <div className="event-price" data-testid={`event-price-${index}`}>{event.price}</div>
              <button 
                className="btn-event-details"
                onClick={() => setLocation(`/speakers/events/${index}`)}
                data-testid={`button-event-details-${index}`}
              >
                <Eye size={16} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="btn-view-all"
        onClick={() => setLocation("/speakers/events")}
        data-testid="button-view-all-bookings"
      >
        View All Bookings
      </button>
    </div>
  );
}

// Content Studio Tab Component
function ContentStudioTab() {
  const [, setLocation] = useLocation();
  
  const contentStats = [
    { label: "Total Content", value: "24", color: "blue" },
    { label: "Total Views", value: "12.4K", color: "green" },
    { label: "Content Revenue", value: "$8,340", color: "purple" },
  ];

  return (
    <div className="content-studio">
      <div className="studio-header">
        <h2>Content Performance</h2>
        <button 
          className="btn-create-new"
          onClick={() => setLocation("/speakers/content/new")}
          data-testid="button-create-new-content"
        >
          <Plus size={18} />
          Create New
        </button>
      </div>

      <div className="content-stats-grid">
        {contentStats.map((stat, index) => (
          <div 
            className={`content-stat-panel ${stat.color}`} 
            key={index}
            data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="stat-value" data-testid={`value-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="create-content-cta">
        <h3>Ready to Share Your Expertise?</h3>
        <p>Create valuable content and reach thousands of students</p>
        <button 
          className="btn-start-creating"
          onClick={() => setLocation("/speakers/content/new")}
          data-testid="button-start-creating"
        >
          Start Creating Content
        </button>
      </div>
    </div>
  );
}

// Earnings Tab Component
function EarningsTab() {
  const [, setLocation] = useLocation();
  
  const transactions = [
    {
      type: "Speaking",
      title: "Ohio State University",
      subtitle: "Sports Marketing Guest Lecture",
      amount: "+$2,500",
      date: "Mar 15, 2025",
    },
    {
      type: "Content Sales",
      title: "Digital Marketing Playbook",
      subtitle: "14 sales this month",
      amount: "+$340",
      date: "Mar 1-14, 2025",
    },
  ];

  return (
    <div className="earnings-content">
      <h2>Earnings Overview</h2>

      <div className="earnings-summary">
        <div className="earnings-card total">
          <div className="earnings-label">Total Earnings (This Month)</div>
          <div className="earnings-value" data-testid="value-total-earnings">$4,280</div>
          <div className="earnings-sub">+$840 from last month</div>
        </div>

        <div className="earnings-card growth">
          <div className="earnings-label">Growth</div>
          <div className="earnings-value" data-testid="value-growth">+24%</div>
          <div className="earnings-badge">vs Last Month</div>
        </div>
      </div>

      <div className="transactions-section">
        <h3>Recent Transactions</h3>
        <div className="transactions-list">
          {transactions.map((tx, index) => (
            <div className="transaction-item" key={index} data-testid={`transaction-${index}`}>
              <div className="transaction-info">
                <h4 className="transaction-type">{tx.type} – {tx.title}</h4>
                <p className="transaction-subtitle">{tx.subtitle}</p>
              </div>
              <div className="transaction-meta">
                <div className="transaction-amount" data-testid={`transaction-amount-${index}`}>
                  {tx.amount}
                </div>
                <div className="transaction-date">{tx.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="btn-detailed-analytics"
        onClick={() => setLocation("/speakers/earnings/analytics")}
        data-testid="button-view-detailed-analytics"
      >
        View Detailed Analytics
      </button>
    </div>
  );
}

// Placeholder component for Messages
function MessagesPlaceholder() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="placeholder-page">
      <MessageSquare size={48} />
      <h2>Messages</h2>
      <p>Your messages will appear here</p>
      <button 
        onClick={() => setLocation('/speakers/dashboard')}
        style={{
          marginTop: '16px',
          background: '#2563EB',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '12px 24px',
          fontWeight: '700',
          cursor: 'pointer'
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// Main Dashboard Component
export default function SpeakersDashboard() {
  return (
    <div className="speaker-dashboard-layout">
      <SpeakerSidebar />
      
      <main className="speaker-main-content">
        <ProfileHeader />
        <KPICards />
        <TabBar />
        
        <div className="tab-content">
          <Switch>
            <Route path="/speakers/dashboard" component={OverviewTab} />
            <Route path="/speakers/dashboard/speaking" component={SpeakingEventsTab} />
            <Route path="/speakers/dashboard/content" component={ContentStudioTab} />
            <Route path="/speakers/dashboard/earnings" component={EarningsTab} />
            <Route path="/speakers/dashboard/messages" component={MessagesPlaceholder} />
          </Switch>
        </div>
      </main>
    </div>
  );
}
