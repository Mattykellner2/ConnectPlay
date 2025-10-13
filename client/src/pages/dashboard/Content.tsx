import Sidebar from "@/components/dashboard/Sidebar";
import "@/styles/dashboard.css";

export default function Content() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div style={{ padding: 24 }}>
          <h1>Content Library</h1>
          <p>This is the content library page placeholder.</p>
        </div>
      </main>
    </div>
  );
}
