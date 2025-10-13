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
          value="1,847" 
          delta="+127 this semester" 
          iconBg="red" 
          iconType="users"
        />
        <StatCard 
          label="Speakers Booked" 
          value="28" 
          delta="+8 this month" 
          iconBg="green" 
          iconType="speakers"
        />
        <StatCard 
          label="Active Cohorts" 
          value="3" 
          delta="3 new courses" 
          iconBg="purple" 
          iconType="cohorts"
        />
        <StatCard 
          label="Avg. Engagement" 
          value="91%" 
          delta="+5% vs last sem." 
          iconBg="amber" 
          iconType="engagement"
        />
      </div>

      <div className="panel-grid">
        <section className="panel">
          <h3>Recent Speaker Events</h3>
          <div className="row" data-testid="speaker-event-1">
            <div className="left">
              <strong>Sarah Chen</strong>
              <div className="meta">ESPN • Sports Marketing 101 • 9/14/2024</div>
            </div>
            <div className="star">★ 4.9</div>
          </div>
          <div className="row" data-testid="speaker-event-2">
            <div className="left">
              <strong>Marcus Johnson</strong>
              <div className="meta">Dallas Cowboys • Communications Workshop • 9/12/2024</div>
            </div>
            <div className="star">★ 4.8</div>
          </div>
          <div className="row" data-testid="speaker-event-3">
            <div className="left">
              <strong>Rachel Kim</strong>
              <div className="meta">Nike • Brand Strategy Panel • 4/4/2024</div>
            </div>
            <div className="star">★ 5.0</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <button 
              className="btn-red" 
              onClick={() => setLocation("/universities/dashboard/speakers")}
              data-testid="button-view-all-speakers"
            >
              View All Speakers
            </button>
          </div>
        </section>

        <section className="panel">
          <h3>Active Student Cohorts</h3>

          <div className="row" data-testid="cohort-1">
            <div className="left">
              <strong>Spring 2024 – Sports Management 401</strong>
              <div className="meta">32 students • Code: OSU-SMGT401-SPR24</div>
            </div>
            <span className="chip">94% engaged</span>
          </div>

          <div className="row" data-testid="cohort-2">
            <div className="left">
              <strong>Marketing Communications 320</strong>
              <div className="meta">28 students • Code: OSU-MKTG320-SPR24</div>
            </div>
            <span className="chip">87% engaged</span>
          </div>

          <div className="row" data-testid="cohort-3">
            <div className="left">
              <strong>Sports Business Analytics</strong>
              <div className="meta">24 students • Code: OSU-ANALYTICS-SPR24</div>
            </div>
            <span className="chip">92% engaged</span>
          </div>

          <div style={{ marginTop: 12 }}>
            <button 
              className="btn-red" 
              onClick={() => setLocation("/universities/dashboard/students")}
              data-testid="button-manage-cohorts"
            >
              Manage All Cohorts
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
