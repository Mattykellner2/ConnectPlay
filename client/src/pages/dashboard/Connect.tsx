import Sidebar from "@/components/dashboard/Sidebar";
import "@/styles/dashboard.css";

export default function Connect() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div style={{ padding: 24 }}>
          <h1>Speaker Connect</h1>
          <p>This is the speaker connect page placeholder.</p>
        </div>
      </main>
    </div>
  );
}
