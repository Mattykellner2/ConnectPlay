import Sidebar from "@/components/dashboard/Sidebar";
import "@/styles/dashboard.css";

export default function DashboardSettings() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div style={{ padding: 24 }}>
          <h1>Settings</h1>
          <p>This is the settings page placeholder.</p>
        </div>
      </main>
    </div>
  );
}
