export default function Features() {
  const feats = [
    { title: 'Verified Speakers', text: 'Curated network of industry professionals across sports, media, and entertainment.', bg: '#EEF2FF' },
    { title: 'Easy Booking', text: 'Streamlined booking process with confirmed availability and automated reminders.', bg: '#ECFDF5' },
    { title: 'Measurable Impact', text: 'Track attendance, engagement, and student outcomes with detailed reporting.', bg: '#F5F3FF' },
  ];
  
  return (
    <section style={{ background: '#fff', padding: '24px 0 40px' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>Complete Platform for Academic-Industry Connections</h2>
        <div className="grid-3" style={{ marginTop: 28, textAlign: 'center' }}>
          {feats.map((f, i) => (
            <div key={i} data-testid={`feature-${i + 1}`}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: f.bg, margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div className="lead" style={{ fontSize: 15 }}>{f.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
