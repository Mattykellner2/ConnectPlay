import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Briefcase, GraduationCap, CheckCircle2, Users, TrendingUp } from "lucide-react";
import "../styles/global.css";

export default function Home() {
  return (
    <div>
      <Navigation />
      
      {/* Hero Section */}
      <section style={{ background: '#fff', padding: '56px 0' }}>
        <div className="container" style={{ textAlign: 'left', maxWidth: 900 }}>
          <h1>
            Connecting Universities with <span style={{ color: 'var(--color-primary)' }}>Industry Experts</span>
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            The premier platform for academic-industry partnerships. Universities manage student access, book verified guest speakers, and track engagement outcomes.
          </p>
        </div>
      </section>

      {/* Three Feature Cards */}
      <section style={{ background: '#fff', padding: '32px 0 48px' }}>
        <div className="container" style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Card 1 – Universities */}
          <div className="card" style={{ borderColor: 'var(--color-border)' }} data-testid="card-universities">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#EFF6FF', display: 'grid', placeItems: 'center', marginBottom: 12 }}>
              <Building2 className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 style={{ margin: '4px 0 8px' }}>For Universities</h3>
            <p className="lead" style={{ fontSize: 15 }}>
              Partner with us to provide your students with access to industry professionals, curated content, and career opportunities at scale.
            </p>
            <a className="btn btn-outline" style={{ marginTop: 16 }} href="/partnerships" data-testid="button-university-partnerships">
              University Partnerships
            </a>
          </div>

          {/* Card 2 – Professionals */}
          <div className="card" style={{ borderColor: 'var(--color-border)' }} data-testid="card-professionals">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F5F3FF', display: 'grid', placeItems: 'center', marginBottom: 12 }}>
              <Briefcase className="h-6 w-6" style={{ color: 'var(--color-purple)' }} />
            </div>
            <h3 style={{ margin: '4px 0 8px' }}>Industry Professionals</h3>
            <p className="lead" style={{ fontSize: 15 }}>
              Join our network of vetted guest speakers and share your expertise with classes that match your experience.
            </p>
            <a className="btn btn-primary" style={{ marginTop: 16 }} href="/become-speaker" data-testid="button-become-speaker">
              Become a Speaker
            </a>
          </div>

          {/* Card 3 – Students */}
          <div className="card" style={{ borderColor: '#FDE68A' }} data-testid="card-students">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFFBEB', display: 'grid', placeItems: 'center', marginBottom: 12 }}>
              <GraduationCap className="h-6 w-6" style={{ color: 'var(--color-amber)' }} />
            </div>
            <h3 style={{ margin: '4px 0 8px' }}>Student Access</h3>
            <p className="lead" style={{ fontSize: 15 }}>
              Students gain access through their university, use access codes provided by your school to join, and connect with verified experts.
            </p>
            <a className="btn btn-outline" style={{ marginTop: 16 }} href="/student-access" data-testid="button-enter-access-code">
              Enter Access Code →
            </a>
          </div>
        </div>
      </section>

      {/* How ConnectPlay Works */}
      <section style={{ background: '#fff', padding: '56px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>How ConnectPlay Works</h2>
          <div style={{ marginTop: 28, display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {[
              { title: '1. University Partners', text: 'Universities sign up and choose their partnership package.', bg: '#EFF6FF' },
              { title: '2. Access Codes', text: 'Universities generate access codes for their students to create accounts.', bg: '#ECFDF5' },
              { title: '3. Book & Access', text: 'Universities book speakers while students access content and events.', bg: '#EEF2FF' },
              { title: '4. Track Impact', text: 'Universities track student engagement and program outcomes.', bg: '#FFFBEB' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }} data-testid={`step-${i + 1}`}>
                <div style={{ width: 48, height: 48, borderRadius: 12, margin: '0 auto 10px', background: item.bg }} />
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div className="lead" style={{ fontSize: 15 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Platform */}
      <section style={{ background: '#fff', padding: '24px 0 56px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>Complete Platform for Academic-Industry Connections</h2>
          <div style={{ marginTop: 28, display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {[
              { title: 'Verified Speakers', text: 'Curated network of industry professionals across sports, media, and entertainment.', bg: '#EEF2FF', icon: CheckCircle2 },
              { title: 'Easy Booking', text: 'Streamlined booking process with confirmed availability and automated reminders.', bg: '#ECFDF5', icon: Users },
              { title: 'Measurable Impact', text: 'Track attendance, engagement, and student outcomes with detailed reporting.', bg: '#F5F3FF', icon: TrendingUp },
            ].map((f, i) => (
              <div key={i} style={{ textAlign: 'center' }} data-testid={`feature-${i + 1}`}>
                <div style={{ width: 48, height: 48, borderRadius: 12, margin: '0 auto 10px', background: f.bg, display: 'grid', placeItems: 'center' }}>
                  <f.icon className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                <div className="lead" style={{ fontSize: 15 }}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by Leading Institutions */}
      <section style={{ background: '#fff', padding: '16px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Trusted by Leading Institutions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 24 }}>
            {['Stanford', 'USC', 'UCLA', 'NYU'].map((name, i) => (
              <div key={i} style={{ fontWeight: 700, color: '#374151' }} data-testid={`institution-${i + 1}`}>
                {name}
                <div style={{ fontWeight: 500, color: '#9CA3AF', marginTop: 6 }}>
                  {['University', 'Annenberg', 'Extension', 'Tisch'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
