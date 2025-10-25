import { useState } from "react";
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
  Building,
  Home,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpeakerSettings from "@/pages/dashboard/SpeakerSettings";
import SpeakingEvents from "@/pages/dashboard/SpeakingEvents";
import SpeakerInvitations from "@/pages/dashboard/SpeakerInvitations";

// Dummy user data (to be replaced with real data)
const dummyUser = {
  id: "pro-1",
  fullName: "Dr. Sarah Martinez",
  title: "Marketing Professor",
  company: "Stanford GSB",
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  connectQuestions: [
    { id: "q1", prompt: "What do you hope to learn from me?", required: true },
    { id: "q2", prompt: "Share a link to your LinkedIn", required: false },
  ],
};

// Dummy connection requests
const dummyRequests = [
  {
    requestId: "req-1",
    studentId: "student-1",
    proId: "pro-1",
    studentName: "Alex Johnson",
    studentProgram: "Business Analytics",
    studentInstitution: "Ohio State University",
    answers: [
      { questionId: "q1", value: "I want to learn about marketing strategy and brand positioning." },
      { questionId: "q2", value: "https://linkedin.com/in/alexjohnson" },
    ],
    priority: true,
    status: "pending" as const,
    createdAt: "2025-03-14T10:30:00Z",
  },
  {
    requestId: "req-2",
    studentId: "student-2",
    proId: "pro-1",
    studentName: "Maria Garcia",
    studentProgram: "Marketing",
    studentInstitution: "UC Berkeley",
    answers: [
      { questionId: "q1", value: "Looking to understand consumer insights research methods." },
    ],
    priority: false,
    status: "pending" as const,
    createdAt: "2025-03-13T14:20:00Z",
  },
];

// Dummy accepted connections
const dummyNetwork = [
  {
    requestId: "req-accepted-1",
    studentName: "Emma Chen",
    studentProgram: "MBA",
    studentInstitution: "Stanford GSB",
    acceptedAt: "2025-03-10T09:15:00Z",
  },
];

// Sidebar Component
function SpeakerSidebar() {
  const [location] = useLocation();
  
  const homeItem = { path: "/", label: "Home Page", icon: Home };
  
  const navItems = [
    { path: "/speakers/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/speakers/dashboard/speaking", label: "Speaking Events", icon: Mic2, exact: false },
    { path: "/speakers/dashboard/invitations", label: "Speaking Invitations", icon: Calendar, exact: false },
    { path: "/speakers/dashboard/events", label: "Events", icon: Calendar, exact: false },
    { path: "/speakers/dashboard/content", label: "Content Studio", icon: FileText, exact: false },
    { path: "/speakers/dashboard/earnings", label: "Earnings", icon: TrendingUp, exact: false },
    { path: "/speakers/dashboard/messages", label: "Messages", icon: MessageSquare, exact: false },
    { path: "/speakers/dashboard/connections", label: "Connections", icon: Users, exact: false },
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
        <Link
          href={homeItem.path}
          className={`speaker-nav-item ${isActive(homeItem.path, true) ? "active" : ""}`}
          data-testid="nav-home-page"
        >
          <Home size={18} />
          <span>{homeItem.label}</span>
        </Link>
      </div>

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
        onClick={() => setLocation("/speakers/dashboard/events")}
        data-testid="button-view-all-bookings"
      >
        View All Bookings
      </button>
    </div>
  );
}

// Events Page Component (full page view)
function EventsPage() {
  const [, setLocation] = useLocation();
  
  const upcomingEvents = [
    {
      title: "Sports Marketing Guest Lecture",
      host: "Ohio State University",
      institution: "Fisher College of Business",
      date: "March 15, 2025",
      time: "2:00 PM EST",
      type: "in-person",
      price: "$2,500",
    },
    {
      title: "Digital Transformation Workshop",
      host: "UC Berkeley",
      institution: "Haas School of Business",
      date: "March 22, 2025",
      time: "10:00 AM PST",
      type: "virtual",
      price: "$1,800",
    },
    {
      title: "Brand Strategy Masterclass",
      host: "University of Michigan",
      institution: "Ross School of Business",
      date: "April 5, 2025",
      time: "3:00 PM EST",
      type: "in-person",
      price: "$3,200",
    },
  ];

  if (upcomingEvents.length === 0) {
    return (
      <div className="events-empty-state">
        <Calendar size={64} className="empty-icon" />
        <h2>No events yet</h2>
        <p>Create your first event or accept a booking request</p>
        <Button onClick={() => setLocation("/speakers/dashboard")} data-testid="button-back-to-dashboard">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="events-page">
      <h1>Speaking Events</h1>
      <div className="events-list">
        {upcomingEvents.map((event, index) => (
          <div className="event-card-full" key={index} data-testid={`event-full-${index}`}>
            <div className="event-header">
              <div>
                <h3>{event.title}</h3>
                <p>{event.host} · {event.institution}</p>
              </div>
              <span className={`event-type-badge ${event.type}`}>{event.type}</span>
            </div>
            <div className="event-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>{event.date}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{event.time}</span>
              </div>
              <div className="meta-item">
                <DollarSign size={16} />
                <span>{event.price}</span>
              </div>
            </div>
            <Button variant="outline" data-testid={`button-details-${index}`}>
              View Details
            </Button>
          </div>
        ))}
      </div>
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

// Connections Hub Component
function ConnectionsHub() {
  const [activeTab, setActiveTab] = useState<"requests" | "network" | "history">("requests");
  const [selectedRequest, setSelectedRequest] = useState<typeof dummyRequests[0] | null>(null);
  const { toast } = useToast();

  const priorityRequests = dummyRequests.filter(r => r.priority && r.status === "pending");
  const regularRequests = dummyRequests.filter(r => !r.priority && r.status === "pending");
  const sortedRequests = [...priorityRequests, ...regularRequests];

  const handleDecision = (requestId: string, decision: "accept" | "decline") => {
    // TODO: Wire to backend
    toast({
      title: decision === "accept" ? "Request Accepted" : "Request Declined",
      description: decision === "accept" 
        ? "The student has been added to your network"
        : "The request has been declined",
    });
    setSelectedRequest(null);
  };

  return (
    <div className="connections-hub">
      <h1>Connections</h1>
      
      <div className="connections-tabs">
        <button
          className={`connections-tab ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
          data-testid="tab-requests"
        >
          Requests
          {sortedRequests.length > 0 && (
            <span className="tab-badge">{sortedRequests.length}</span>
          )}
        </button>
        <button
          className={`connections-tab ${activeTab === "network" ? "active" : ""}`}
          onClick={() => setActiveTab("network")}
          data-testid="tab-network"
        >
          Network
          <span className="tab-badge">{dummyNetwork.length}</span>
        </button>
        <button
          className={`connections-tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
          data-testid="tab-history"
        >
          History
        </button>
      </div>

      <div className="connections-content">
        {activeTab === "requests" && (
          <div className="requests-list">
            {sortedRequests.length === 0 ? (
              <div className="empty-state">
                <Users size={48} />
                <h3>No pending requests</h3>
                <p>Connection requests will appear here</p>
              </div>
            ) : (
              sortedRequests.map((request) => (
                <div
                  key={request.requestId}
                  className="request-card"
                  data-testid={`request-${request.requestId}`}
                >
                  {request.priority && (
                    <span className="priority-badge" data-testid={`priority-badge-${request.requestId}`}>
                      <AlertCircle size={14} />
                      Priority
                    </span>
                  )}
                  <div className="request-info">
                    <h4>{request.studentName}</h4>
                    <p>{request.studentProgram} · {request.studentInstitution}</p>
                    <span className="request-time">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRequest(request)}
                    data-testid={`button-review-${request.requestId}`}
                  >
                    Review
                  </Button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "network" && (
          <div className="network-list">
            {dummyNetwork.length === 0 ? (
              <div className="empty-state">
                <Users size={48} />
                <h3>No connections yet</h3>
                <p>Accepted connections will appear here</p>
              </div>
            ) : (
              dummyNetwork.map((connection, index) => (
                <div key={index} className="network-card" data-testid={`network-${index}`}>
                  <div className="network-info">
                    <h4>{connection.studentName}</h4>
                    <p>{connection.studentProgram} · {connection.studentInstitution}</p>
                    <span className="connection-date">
                      Connected on {new Date(connection.acceptedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="network-actions">
                    <Button variant="outline" size="sm" data-testid={`button-message-${index}`}>
                      <MessageSquare size={16} />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" data-testid={`button-invite-${index}`}>
                      <Calendar size={16} />
                      Invite to Event
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="empty-state">
            <Clock size={48} />
            <h3>No history yet</h3>
            <p>Past declined or expired requests will appear here</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent data-testid="dialog-review-request">
          <DialogHeader>
            <DialogTitle>
              Connection Request
              {selectedRequest?.priority && (
                <span className="priority-badge-inline">Priority</span>
              )}
            </DialogTitle>
            <DialogDescription>
              From {selectedRequest?.studentName} · {selectedRequest?.studentProgram} at {selectedRequest?.studentInstitution}
            </DialogDescription>
          </DialogHeader>
          
          <div className="request-answers">
            {selectedRequest?.answers.map((answer) => {
              const question = dummyUser.connectQuestions.find(q => q.id === answer.questionId);
              return (
                <div key={answer.questionId} className="answer-item">
                  <label>{question?.prompt}</label>
                  <p>{answer.value}</p>
                </div>
              );
            })}
          </div>

          <div className="modal-actions">
            <Button
              onClick={() => selectedRequest && handleDecision(selectedRequest.requestId, "accept")}
              data-testid="button-accept-request"
            >
              <CheckCircle size={16} />
              Accept
            </Button>
            <Button
              variant="outline"
              onClick={() => selectedRequest && handleDecision(selectedRequest.requestId, "decline")}
              data-testid="button-decline-request"
            >
              <XCircle size={16} />
              Decline
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
        data-testid="button-back-to-dashboard"
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
        <Switch>
          <Route path="/speakers/settings">
            <SpeakerSettings />
          </Route>
          <Route path="/speakers/dashboard/events">
            <EventsPage />
          </Route>
          <Route path="/speakers/dashboard/connections">
            <ConnectionsHub />
          </Route>
          <Route path="/speakers/dashboard/messages">
            <MessagesPlaceholder />
          </Route>
          <Route path="/speakers/dashboard/speaking">
            <SpeakingEvents />
          </Route>
          <Route path="/speakers/dashboard/invitations">
            <SpeakerInvitations />
          </Route>
          <Route>
            <ProfileHeader />
            <KPICards />
            <TabBar />
            
            <div className="tab-content">
              <Switch>
                <Route path="/speakers/dashboard" component={OverviewTab} />
                <Route path="/speakers/dashboard/speaking" component={SpeakingEventsTab} />
                <Route path="/speakers/dashboard/content" component={ContentStudioTab} />
                <Route path="/speakers/dashboard/earnings" component={EarningsTab} />
              </Switch>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
