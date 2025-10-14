import Sidebar from "@/components/dashboard/Sidebar";
import "@/styles/dashboard.css";

export default function EventsAmaNew() {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Host a New AMA</h1>
          <p style={{ color: "#6B7280", marginBottom: 24 }}>
            AMA Creation Form (placeholder)
          </p>
          <div style={{ 
            padding: 40, 
            background: "#F7F9FC", 
            borderRadius: 12, 
            textAlign: "center",
            color: "#94A3B8"
          }}>
            This is where the AMA creation form will be implemented.
          </div>
        </div>
      </main>
    </div>
  );
}
