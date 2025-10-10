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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/partnerships" component={Partnerships} />
      <Route path="/become-speaker" component={BecomeSpeaker} />
      <Route path="/student-access" component={StudentAccess} />
      <Route path="/university-dashboard" component={UniversityDashboard} />
      <Route path="/speaker-dashboard" component={SpeakerDashboard} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
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
