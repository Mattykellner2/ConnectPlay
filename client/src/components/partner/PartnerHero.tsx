type Props = { 
  name?: string; 
  title?: string; 
  avatarUrl?: string 
};

export default function PartnerHero({ name, title, avatarUrl }: Props) {
  const displayName = name || "Your Name";
  const displayTitle = title || "University Administrator";
  
  return (
    <div className="u-hero">
      <div className="u-hero-left">
        <img 
          className="u-hero-avatar" 
          src={avatarUrl || "https://via.placeholder.com/112"} 
          alt="Profile" 
          data-testid="hero-avatar"
        />
        <div>
          <h1 className="u-hero-title" data-testid="hero-welcome">Welcome back, {displayName}</h1>
          <div className="u-hero-sub" data-testid="hero-title">{displayTitle}</div>
          <span className="u-hero-badge" data-testid="hero-badge">University Partner</span>
        </div>
      </div>
      <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
        <button 
          className="btn-primary" 
          onClick={() => (window.location.href = "/universities/partner-dashboard/content/new")}
          data-testid="button-create-content-hero"
        >
          ⧁ Create Content
        </button>
        <div style={{ height: 36, background: "#ffffff1a", border: '1px solid #ffffff33', borderRadius: 8, minWidth: 120 }} />
      </div>
    </div>
  );
}
