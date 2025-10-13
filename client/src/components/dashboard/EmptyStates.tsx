import { useLocation } from "wouter";

export function EmptySpeakers() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h3>Guest Speaker History</h3>
      <p style={{ color: "#64748B", margin: "8px 0 14px" }}>
        No speakers yet. Book a speaker to get started.
      </p>
      <button 
        className="btn-red" 
        onClick={() => setLocation("/universities/dashboard/speakers/new")}
        data-testid="button-book-speaker"
      >
        + Book New Speaker
      </button>
    </div>
  );
}

export function EmptyStudents() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h3>Student Cohort Management</h3>
      <p style={{ color: "#64748B", margin: "8px 0 14px" }}>
        No cohorts yet. Create your first class.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button 
          className="btn-red" 
          onClick={() => setLocation("/universities/dashboard/students/new")}
          data-testid="button-create-class"
        >
          + Create Class
        </button>
        <button 
          className="btn-red" 
          onClick={() => alert("Import flow TBD")}
          data-testid="button-import-roster"
        >
          Import Roster
        </button>
      </div>
    </div>
  );
}

export function EmptyAccessCodes() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h3>Access Code Management</h3>
      <p style={{ color: "#64748B", margin: "8px 0 14px" }}>
        No codes yet. Create access codes for your classes.
      </p>
      <button 
        className="btn-red" 
        onClick={() => setLocation("/universities/dashboard/access-codes/new")}
        data-testid="button-create-codes"
      >
        + Create New Codes
      </button>
    </div>
  );
}
