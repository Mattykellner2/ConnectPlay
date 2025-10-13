import ConnectPlayLogo from "./ConnectPlayLogo";

export default function Hero() {
  return (
    <section style={{ background: '#F1F5F9', padding: '48px 0 56px' }}>
      <div className="container" style={{ maxWidth: 900, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          <ConnectPlayLogo size={64} />
          <div style={{ fontWeight: 800, fontSize: 42 }}>ConnectPlay</div>
        </div>
        <h1>
          Connecting Universities with <span style={{ color: '#2563EB' }}>Industry Experts</span>
        </h1>
        <p className="lead" style={{ marginTop: 28 }}>
          The premier platform for academic-industry partnerships. Universities manage student access, book verified guest speakers, and track engagement outcomes.
        </p>
      </div>
    </section>
  );
}
