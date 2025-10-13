export default function PartnerActivity() {
  const items = [
    { text: 'Your organization enabled Content Studio', time: 'Just now' },
    { text: 'No bookings yet — invite industry speakers to connect', time: '—' },
  ];

  return (
    <div className="panel">
      <h3>Recent Activity</h3>
      <div className="activity">
        {items.map((it, i) => (
          <div className="item" key={i} data-testid={`partner-activity-item-${i}`}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="dot" />
              <div>{it.text}</div>
            </div>
            <div className="meta">{it.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
