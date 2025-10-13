import { Switch, Route } from "wouter";
import Sidebar from "@/components/dashboard/Sidebar";
import Tabs from "@/components/dashboard/Tabs";
import Overview from "@/pages/dashboard/Overview";
import GuestSpeakers from "@/pages/dashboard/GuestSpeakers";
import StudentManagement from "@/pages/dashboard/StudentManagement";
import AccessCodes from "@/pages/dashboard/AccessCodes";
import "@/styles/dashboard.css";

export default function UniversitiesDashboard() {
  return (
    <div className="dashboard-shell">
      <Sidebar />

      <main className="main">
        <Tabs />
        
        <div style={{ marginTop: 14 }}>
          <Switch>
            <Route path="/universities/dashboard" component={Overview} />
            <Route path="/universities/dashboard/speakers" component={GuestSpeakers} />
            <Route path="/universities/dashboard/students" component={StudentManagement} />
            <Route path="/universities/dashboard/access-codes" component={AccessCodes} />
            
            {/* Placeholder "new" routes */}
            <Route path="/universities/dashboard/speakers/new">
              <div className="panel">
                <h3>Book New Speaker</h3>
                <p style={{ color: "#64748B" }}>Speaker booking form (TBD)</p>
              </div>
            </Route>
            <Route path="/universities/dashboard/students/new">
              <div className="panel">
                <h3>Create New Class</h3>
                <p style={{ color: "#64748B" }}>Class creation form (TBD)</p>
              </div>
            </Route>
            <Route path="/universities/dashboard/access-codes/new">
              <div className="panel">
                <h3>Create Access Codes</h3>
                <p style={{ color: "#64748B" }}>Access code generation form (TBD)</p>
              </div>
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}
