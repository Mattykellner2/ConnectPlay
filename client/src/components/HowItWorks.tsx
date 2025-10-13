export default function HowItWorks() {
  const items = [
    { title: '1. University Partners', text: 'Universities sign up and choose their partnership package.', bg: '#EFF6FF' },
    { title: '2. Access Codes', text: 'Universities generate access codes for their students to create accounts.', bg: '#ECFDF5' },
    { title: '3. Book & Access', text: 'Universities book speakers while students access content and events.', bg: '#EEF2FF' },
    { title: '4. Track Impact', text: 'Universities track student engagement and program outcomes.', bg: '#FFFBEB' },
  ];
  
  return (
    <section style={{ background: '#fff', padding: '40px 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>How ConnectPlay Works</h2>
        <div className="grid-4" style={{ marginTop: 28 }}>
          {items.map((it, i) => (
            <div key={i} style={{ textAlign: 'center' }} data-testid={`step-${i + 1}`}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: it.bg, margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{it.title}</div>
              <div className="lead" style={{ fontSize: 15 }}>{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
