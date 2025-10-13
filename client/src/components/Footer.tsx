export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24 }}>
        <div>
          <div style={{ fontWeight: 800, color: '#fff' }}>ConnectPlay</div>
          <p className="muted" style={{ marginTop: 10 }}>Connecting universities with industry professionals for enhanced student learning.</p>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: 8 }}>Platform</div>
          <div><a href="/partnerships" data-testid="footer-link-universities">Universities</a></div>
          <div><a href="/become-speaker" data-testid="footer-link-professionals">Industry Professionals</a></div>
          <div><a href="/student-access" data-testid="footer-link-student-access">Student Access</a></div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: 8 }}>Company</div>
          <div><a href="/about" data-testid="footer-link-about">About Us</a></div>
          <div><a href="/contact" data-testid="footer-link-contact">Contact</a></div>
          <div><a href="/partnerships" data-testid="footer-link-partner">Partner with Us</a></div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#E5E7EB', marginBottom: 8 }}>Support</div>
          <div><a href="/contact" data-testid="footer-link-help">Help Center</a></div>
          <div><a href="/partnerships" data-testid="footer-link-partnerships">Partnerships</a></div>
        </div>
      </div>
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,.08)', marginTop: 24, paddingTop: 16 }}>
        <div className="muted">© 2024 ConnectPlay. All rights reserved.</div>
      </div>
    </footer>
  );
}
