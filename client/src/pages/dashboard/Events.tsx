import Sidebar from "@/components/dashboard/Sidebar";
import "@/styles/dashboard.css";

export default function Events() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div style={{ padding: 24 }}>
          <h1>Events</h1>
          <p>This is the events page placeholder.</p>
        </div>
      </main>
    </div>
  );
}
