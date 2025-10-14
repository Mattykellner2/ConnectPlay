import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Partnerships from "@/pages/Partnerships";
import BecomeSpeaker from "@/pages/BecomeSpeaker";
import StudentAccess from "@/pages/StudentAccess";
import UniversityDashboard from "@/pages/UniversityDashboard";
import SpeakerDashboard from "@/pages/SpeakerDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

import UniversitiesDashboard from "@/pages/UniversitiesDashboard";
import SpeakersDashboard from "@/pages/SpeakersDashboard";
import UniversityPartnerDashboard from "@/pages/UniversityPartnerDashboard";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import ContentLibrary from "@/pages/ContentLibrary";
import EventsAma from "@/pages/EventsAma";
import EventsAmaNew from "@/pages/EventsAmaNew";
import Messages from "@/pages/dashboard/Messages";
import Connect from "@/pages/dashboard/Connect";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/partnerships" component={Partnerships} />
      <Route path="/universities" component={Partnerships} />
      <Route path="/become-speaker" component={BecomeSpeaker} />
      <Route path="/professionals" component={BecomeSpeaker} />
      <Route path="/student-access" component={StudentAccess} />
      <Route path="/university-dashboard" component={UniversityDashboard} />
      <Route path="/speaker-dashboard" component={SpeakerDashboard} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Universities Dashboard with nested tab routing */}
      <Route path="/universities/dashboard" component={UniversitiesDashboard} />
      <Route path="/universities/dashboard/speakers" component={UniversitiesDashboard} />
      <Route path="/universities/dashboard/students" component={UniversitiesDashboard} />
      <Route path="/universities/dashboard/access-codes" component={UniversitiesDashboard} />
      <Route path="/universities/dashboard/speakers/new" component={UniversitiesDashboard} />
      <Route path="/universities/dashboard/students/new" component={UniversitiesDashboard} />
      <Route path="/universities/dashboard/access-codes/new" component={UniversitiesDashboard} />
      
      {/* Sidebar navigation pages */}
      <Route path="/universities/dashboard/home" component={DashboardHome} />
      <Route path="/universities/dashboard/content" component={ContentLibrary} />
      <Route path="/universities/dashboard/events" component={EventsAma} />
      <Route path="/universities/dashboard/events/new" component={EventsAmaNew} />
      <Route path="/universities/dashboard/messages" component={Messages} />
      <Route path="/universities/dashboard/connect" component={Connect} />
      <Route path="/universities/dashboard/settings" component={DashboardSettings} />
      
      {/* Speakers Dashboard with nested tab routing */}
      <Route path="/speakers/dashboard" component={SpeakersDashboard} />
      <Route path="/speakers/dashboard/speaking" component={SpeakersDashboard} />
      <Route path="/speakers/dashboard/content" component={SpeakersDashboard} />
      <Route path="/speakers/dashboard/earnings" component={SpeakersDashboard} />
      
      {/* University Partner Dashboard with nested tab routing */}
      <Route path="/universities/partner-dashboard" component={UniversityPartnerDashboard} />
      <Route path="/universities/partner-dashboard/speaking" component={UniversityPartnerDashboard} />
      <Route path="/universities/partner-dashboard/content" component={UniversityPartnerDashboard} />
      <Route path="/universities/partner-dashboard/earnings" component={UniversityPartnerDashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
