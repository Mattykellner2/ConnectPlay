export default function LogosBand() {
  const names = ['Stanford', 'USC', 'UCLA', 'NYU'];
  const subs = ['University', 'Annenberg', 'Extension', 'Tisch'];
  
  return (
    <section style={{ background: '#fff', padding: '16px 0 40px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Trusted by Leading Institutions</h2>
        <div className="grid-4" style={{ marginTop: 24 }}>
          {names.map((n, i) => (
            <div key={n} style={{ fontWeight: 700, color: '#374151' }} data-testid={`institution-${i + 1}`}>
              {n}
              <div style={{ fontWeight: 500, color: '#9CA3AF', marginTop: 6 }}>{subs[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
