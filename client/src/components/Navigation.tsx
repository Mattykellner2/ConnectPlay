import ConnectPlayLogo from "./ConnectPlayLogo";
import "../styles/global.css";

export default function Navigation() {
  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }} data-testid="link-home-logo">
          <ConnectPlayLogo size={36} />
          <div style={{ fontWeight: 800, fontSize: 18 }}>ConnectPlay</div>
        </a>
        <nav className="navlinks" style={{ display: 'flex', gap: 20 }}>
          <a href="/partnerships" data-testid="link-universities">Universities</a>
          <a href="/become-speaker" data-testid="link-professionals">Industry Professionals</a>
          <a href="/about" data-testid="link-about">About</a>
          <a href="/contact" data-testid="link-contact">Contact</a>
        </nav>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/student-access" data-testid="link-student-login">Student Login</a>
          <a className="btn btn-outline" href="/admin" data-testid="link-admin-login">Admin Login</a>
        </div>
      </div>
    </header>
  );
}
