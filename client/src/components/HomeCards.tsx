export default function HomeCards() {
  return (
    <section style={{ background: '#fff', padding: '24px 0 40px' }}>
      <div className="container grid-3">
        <div className="card" data-testid="card-universities">
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EFF6FF', marginBottom: 12 }} />
          <h3 style={{ margin: '4px 0 8px', fontWeight: 700 }}>For Universities</h3>
          <p className="lead">Partner with us to provide your students with access to industry professionals, curated content, and career opportunities at scale.</p>
          <a className="btn btn-outline" style={{ marginTop: 16 }} href="/partnerships" data-testid="button-university-partnerships">University Partnerships</a>
        </div>
        <div className="card" data-testid="card-professionals">
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F5F3FF', marginBottom: 12 }} />
          <h3 style={{ margin: '4px 0 8px', fontWeight: 700 }}>Industry Professionals</h3>
          <p className="lead">Join our network of vetted guest speakers and share your expertise with classes that match your experience.</p>
          <a className="btn btn-primary" style={{ marginTop: 16 }} href="/become-speaker" data-testid="button-become-speaker">Become a Speaker</a>
        </div>
        <div className="card" style={{ borderColor: '#FDE68A' }} data-testid="card-students">
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFFBEB', marginBottom: 12 }} />
          <h3 style={{ margin: '4px 0 8px', fontWeight: 700 }}>Student Access</h3>
          <p className="lead">Students gain access through their university, use access codes provided by your school to join, and connect with verified experts.</p>
          <a className="btn btn-outline" style={{ marginTop: 16 }} href="/student-access" data-testid="button-enter-access-code">Enter Access Code →</a>
        </div>
      </div>
    </section>
  );
}
