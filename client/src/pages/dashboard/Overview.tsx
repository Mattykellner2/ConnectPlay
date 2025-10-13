import { useLocation } from "wouter";
import TopHeader from "@/components/dashboard/TopHeader";
import StatCard from "@/components/dashboard/StatCard";

export default function Overview() {
  const [, setLocation] = useLocation();

  return (
    <>
      <TopHeader />

      <div className="stat-grid">
        <StatCard 
          label="Active Students" 
          value="—" 
          delta="" 
          iconBg="red" 
          iconType="users"
        />
        <StatCard 
          label="Speakers Booked" 
          value="—" 
          delta="" 
          iconBg="green" 
          iconType="speakers"
        />
        <StatCard 
          label="Active Cohorts" 
          value="—" 
          delta="" 
          iconBg="purple" 
          iconType="cohorts"
        />
        <StatCard 
          label="Avg. Engagement" 
          value="—" 
          delta="" 
          iconBg="amber" 
          iconType="engagement"
        />
      </div>

      <div className="panel-grid">
        <section className="panel">
          <h3>Recent Speaker Events</h3>
          <div style={{ padding: "32px 0", textAlign: "center", color: "#64748B" }}>
            <p style={{ marginBottom: 16 }}>No speaker events yet.</p>
            <p style={{ fontSize: 14 }}>Book speakers to see events appear here.</p>
          </div>
          <div style={{ marginTop: 12 }}>
            <button 
              className="btn-red" 
              onClick={() => setLocation("/universities/dashboard/speakers")}
              data-testid="button-view-all-speakers"
            >
              Book Speaker
            </button>
          </div>
        </section>

        <section className="panel">
          <h3>Active Student Cohorts</h3>
          <div style={{ padding: "32px 0", textAlign: "center", color: "#64748B" }}>
            <p style={{ marginBottom: 16 }}>No cohorts created yet.</p>
            <p style={{ fontSize: 14 }}>Create classes to track student engagement.</p>
          </div>
          <div style={{ marginTop: 12 }}>
            <button 
              className="btn-red" 
              onClick={() => setLocation("/universities/dashboard/students")}
              data-testid="button-manage-cohorts"
            >
              Create Cohort
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
