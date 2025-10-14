import { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "wouter";
import "@/styles/student.css";
import { 
  Home,
  LayoutDashboard,
  Users,
  Library,
  Calendar,
  MessageSquare,
  Link as LinkIcon,
  Settings,
  Code,
  Search,
  Play,
  X,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dummy student data
const dummyStudent = {
  id: "student-1",
  firstName: "Alex",
  lastName: "Johnson",
  institutionName: "Ohio State University",
  programName: "Business Analytics",
  gradYear: "2025",
  photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
};

// Dummy professionals data
const dummyPros = [
  {
    id: "pro-1",
    name: "Dr. Sarah Martinez",
    title: "Marketing Professor",
    org: "Stanford GSB",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    tags: ["Marketing", "Brand Strategy"],
    bio: "20+ years experience in brand marketing and consumer insights",
    connectQuestions: [
      { id: "q1", prompt: "What do you hope to learn from me?", required: true },
      { id: "q2", prompt: "Share a link to your LinkedIn", required: false },
    ],
  },
  {
    id: "pro-2",
    name: "Michael Chen",
    title: "VP of Operations",
    org: "Tech Startup Inc",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    tags: ["Operations", "Partnerships"],
    bio: "Expert in scaling operations and building strategic partnerships",
    connectQuestions: [
      { id: "q1", prompt: "What's your dream role?", required: true },
    ],
  },
];

// Dummy upcoming events
const dummyEvents = [
  {
    id: "event-1",
    title: "AI in Business Workshop",
    host: "Dr. Emily Zhang",
    org: "MIT Sloan",
    date: "Tomorrow",
    time: "2:00 PM",
  },
  {
    id: "event-2",
    title: "Career Development AMA",
    host: "Panel Discussion",
    org: "Career Services",
    date: "March 18",
    time: "4:00 PM",
  },
];

// Sidebar Component
function StudentSidebar() {
  const [location] = useLocation();
  
  const quickAccessItems = [
    { path: "/", label: "Home Page", icon: Home },
  ];
  
  const navItems = [
    { path: "/students/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/students/dashboard/speakers", label: "My Speakers", icon: Users, exact: false },
    { path: "/students/dashboard/content", label: "Content Library", icon: Library, exact: false },
    { path: "/students/dashboard/events", label: "Events", icon: Calendar, exact: false },
    { path: "/students/dashboard/messages", label: "Messages", icon: MessageSquare, exact: false },
    { path: "/students/dashboard/connect", label: "Speaker Connect", icon: LinkIcon, exact: false },
    { path: "/students/settings", label: "Settings", icon: Settings, exact: false },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location === path;
    return location.startsWith(path);
  };

  return (
    <aside className="student-sidebar">
      <Link href="/students/dashboard" className="student-brand" data-testid="link-student-logo">
        <img src="/brand/connectplay-mark.svg" width={32} height={32} alt="ConnectPlay" />
        <span>ConnectPlay</span>
      </Link>

      <div className="student-nav-section">
        <div className="student-section-label">Quick Access</div>
        {quickAccessItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`student-nav-item ${isActive(item.path) ? "active" : ""}`}
              data-testid="nav-home-page"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="student-nav-section">
        <div className="student-section-label">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`student-nav-item ${isActive(item.path, item.exact) ? "active" : ""}`}
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

// Red Gradient Header
function StudentHeader() {
  return (
    <div className="student-header">
      <div className="header-content">
        <img 
          src={dummyStudent.photoUrl} 
          alt={dummyStudent.firstName}
          className="header-photo"
          data-testid="img-student-photo"
        />
        <div>
          <h2 className="header-welcome" data-testid="text-welcome">
            Welcome back, {dummyStudent.firstName}!
          </h2>
          <p className="header-subtitle" data-testid="text-student-info">
            {dummyStudent.institutionName} · {dummyStudent.programName} · Class of {dummyStudent.gradYear}
          </p>
        </div>
      </div>
    </div>
  );
}

// Speaker Code Callout
function SpeakerCodeCallout() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (code === "1234") {
      toast({
        title: "Code Accepted!",
        description: "You now have priority access to this speaker.",
      });
      setIsOpen(false);
      setCode("");
    } else {
      toast({
        title: "Invalid Code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="speaker-code-callout">
      <div>
        <h3>Connect with a Speaker</h3>
        <p>Got an access code from a guest lecture? Use it for a priority connection.</p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="btn-enter-code" data-testid="button-enter-speaker-code">
            <Code size={18} />
            Enter Speaker Code
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Speaker Code</DialogTitle>
            <DialogDescription>
              Enter the code provided by your speaker for priority connection access.
            </DialogDescription>
          </DialogHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code..."
              data-testid="input-speaker-code"
              className="text-center text-lg font-mono tracking-wider"
            />
            <Button onClick={handleSubmit} className="w-full" data-testid="button-submit-code">
              Submit Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Dashboard Home Component
function DashboardHome() {
  return (
    <>
      <SpeakerCodeCallout />
      
      <div className="dashboard-grid">
        {/* Upcoming For You */}
        <div className="upcoming-card">
          <h3>Upcoming For You</h3>
          <div className="upcoming-list">
            {dummyEvents.map((event) => (
              <div className="upcoming-item" key={event.id} data-testid={`upcoming-${event.id}`}>
                <div>
                  <div className="upcoming-title">{event.title}</div>
                  <div className="upcoming-host">{event.host} · {event.org}</div>
                  <div className="upcoming-time">{event.date} at {event.time}</div>
                </div>
                <button className="btn-view" data-testid={`button-view-${event.id}`}>
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Recommended */}
          <div className="recommended-card">
            <h3>Recommended For You</h3>
            <div className="recommended-item">
              <div className="recommended-thumb">
                <Play size={32} className="play-icon" />
              </div>
              <div className="recommended-info">
                <div className="recommended-title">Brand Strategy Masterclass</div>
                <div className="recommended-creator">By Dr. Sarah Martinez</div>
                <button className="btn-watch" data-testid="button-watch-now">
                  Watch Now
                </button>
              </div>
            </div>
          </div>

          {/* Sponsored */}
          <div className="sponsored-card">
            <div className="sponsored-pill">Sponsored Opportunity (Ad)</div>
            <h4 className="sponsored-title">Product Marketing Intern</h4>
            <div className="sponsored-company">TechCorp · San Francisco, CA</div>
            <p className="sponsored-desc">Join our dynamic team and help shape the future of tech products.</p>
            <div className="sponsored-actions">
              <button className="btn-learn-more" data-testid="button-learn-more">
                Learn More
              </button>
              <button className="btn-apply" data-testid="button-apply">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Connect Request Modal Component
function ConnectRequestModal({ pro, isOpen, onClose }: any) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = () => {
    const allRequiredAnswered = pro.connectQuestions
      .filter((q: any) => q.required)
      .every((q: any) => answers[q.id]?.trim());

    if (!allRequiredAnswered) {
      toast({
        title: "Required Fields Missing",
        description: "Please answer all required questions.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Sent!",
      description: `You'll be notified when ${pro.name.split(' ')[0]} responds.`,
    });
    onClose();
    setAnswers({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Connect with {pro.name}</DialogTitle>
          <DialogDescription>
            Answer the following questions to send your connection request.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
          {pro.connectQuestions?.map((question: any) => (
            <div key={question.id}>
              <label style={{ 
                display: 'block', 
                fontWeight: '600', 
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                {question.prompt} {question.required && <span style={{ color: '#DC2626' }}>*</span>}
              </label>
              <Input
                value={answers[question.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                placeholder="Your answer..."
                data-testid={`input-answer-${question.id}`}
              />
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full" data-testid="button-send-request">
            <Send size={16} className="mr-2" />
            Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Speaker Connect Component
function SpeakerConnect() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPro, setSelectedPro] = useState<any>(null);
  const [filter, setFilter] = useState<string[]>([]);

  const allTags = ["Marketing", "Operations", "Partnerships", "Brand Strategy"];

  const filteredPros = dummyPros.filter((pro) => {
    const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.org.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter.length === 0 || filter.some(tag => pro.tags.includes(tag));
    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (tag: string) => {
    setFilter(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="speaker-connect-page">
      <h2 className="page-title">Find Industry Professionals</h2>

      {/* Search and Filters */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, or topic..."
            className="search-input"
            data-testid="input-search-pros"
          />
        </div>

        <div className="filter-tags">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`filter-tag ${filter.includes(tag) ? 'active' : ''}`}
              data-testid={`filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {filter.includes(tag) && <X size={14} />}
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="pros-grid">
        {filteredPros.map((pro) => (
          <div className="pro-card" key={pro.id} data-testid={`pro-card-${pro.id}`}>
            <img src={pro.photoUrl} alt={pro.name} className="pro-photo" />
            <h4 className="pro-name">{pro.name}</h4>
            <div className="pro-title">{pro.title}</div>
            <div className="pro-org">{pro.org}</div>
            <p className="pro-bio">{pro.bio}</p>
            <div className="pro-tags">
              {pro.tags.map((tag) => (
                <span key={tag} className="pro-tag">{tag}</span>
              ))}
            </div>
            <button
              onClick={() => setSelectedPro(pro)}
              className="btn-connect"
              data-testid={`button-connect-${pro.id}`}
            >
              Connect
            </button>
          </div>
        ))}
      </div>

      {selectedPro && (
        <ConnectRequestModal
          pro={selectedPro}
          isOpen={!!selectedPro}
          onClose={() => setSelectedPro(null)}
        />
      )}
    </div>
  );
}

// Placeholder components for other tabs
function MySpeakers() {
  return (
    <div className="placeholder-content">
      <Users size={48} />
      <h3>My Speakers</h3>
      <p>Your connected speakers will appear here</p>
    </div>
  );
}

function ContentLibrary() {
  return (
    <div className="placeholder-content">
      <Library size={48} />
      <h3>Content Library</h3>
      <p>Browse educational content from industry professionals</p>
    </div>
  );
}

function Events() {
  return (
    <div className="placeholder-content">
      <Calendar size={48} />
      <h3>Events</h3>
      <p>Your upcoming events and AMAs</p>
    </div>
  );
}

function Messages() {
  return (
    <div className="placeholder-content">
      <MessageSquare size={48} />
      <h3>Messages</h3>
      <p>Your messages with speakers will appear here</p>
    </div>
  );
}

// Main Dashboard Component
export default function StudentsDashboard() {
  return (
    <div className="student-dashboard-layout">
      <StudentSidebar />
      
      <main className="student-main-content">
        <StudentHeader />
        
        <div className="student-content-area">
          <Switch>
            <Route path="/students/dashboard" component={DashboardHome} />
            <Route path="/students/dashboard/speakers" component={MySpeakers} />
            <Route path="/students/dashboard/content" component={ContentLibrary} />
            <Route path="/students/dashboard/events" component={Events} />
            <Route path="/students/dashboard/messages" component={Messages} />
            <Route path="/students/dashboard/connect" component={SpeakerConnect} />
          </Switch>
        </div>
      </main>
    </div>
  );
}
