export default function ActivityList() {
  const items = [
    { text: 'Alex Johnson purchased "Sponsorship Deck Masterclass"', time: '2 hours ago' },
    { text: 'New speaking request from UCLA Extension', time: '1 day ago' },
    { text: 'New message from Maria Garcia', time: '2 days ago' },
    { text: 'Content "Digital Marketing Playbook" reached 500 views', time: '3 days ago' },
  ];

  return (
    <div className="panel">
      <h3>Recent Activity</h3>
      <div className="activity">
        {items.map((it, i) => (
          <div className="item" key={i} data-testid={`activity-item-${i}`}>
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
