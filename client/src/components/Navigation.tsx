import "../styles/global.css";

export default function Navigation() {
  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }} data-testid="link-home">
            <strong style={{ fontSize: 18 }}>ConnectPlay</strong>
          </a>
        </div>
        <nav className="navlinks" style={{ display: 'flex', gap: 20 }}>
          <a href="/partnerships" data-testid="link-universities">Universities</a>
          <a href="/become-speaker" data-testid="link-professionals">Industry Professionals</a>
          <a href="/about" data-testid="link-about">About</a>
          <a href="/contact" data-testid="link-contact">Contact</a>
        </nav>
        <div className="nav-actions" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/student-access" style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }} data-testid="link-student-login">
            Student Login
          </a>
          <a className="chip" href="/admin" data-testid="link-admin-login">Admin Login</a>
        </div>
      </div>
    </header>
  );
}
