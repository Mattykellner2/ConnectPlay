import ConnectPlayLogo from "./ConnectPlayLogo";

export default function Hero() {
  return (
    <section style={{ background: '#F1F5F9', padding: '80px 0 100px' }}>
      <div className="container" style={{ maxWidth: 1000, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 48 }}>
          <ConnectPlayLogo size={80} />
          <div style={{ fontWeight: 800, fontSize: 48 }}>ConnectPlay</div>
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', marginBottom: 24 }}>
          Connecting Universities with <span style={{ color: '#2563EB' }}>Industry Experts</span>!
        </h1>
        <p className="lead" style={{ fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
          The premier platform for academic-industry partnerships. Universities manage student access, book verified guest speakers, and track engagement outcomes.
        </p>
      </div>
    </section>
  );
}
