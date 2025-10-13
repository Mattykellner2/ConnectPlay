import { UniIcon, MicIcon, StudentIcon } from './icons';
import '../styles/global.css';

export default function HomeCards() {
  return (
    <section style={{ background: '#fff', padding: '60px 0 80px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {/* Universities */}
        <div 
          className="card" 
          style={{ background: '#EFF6FF', borderColor: '#DBEAFE', padding: 32 }} 
          data-testid="card-universities"
        >
          <div className="icon-chip icon-blue" style={{ width: '64px', height: '64px', margin: '0 0 20px 0' }}>
            <UniIcon/>
          </div>
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 20 }}>For Universities</h3>
          <p className="lead" style={{ marginBottom: 24, fontSize: 15 }}>
            Partner with us to provide your students access to industry professionals, content, and career opportunities at scale.
          </p>
          <a 
            className="btn btn-primary" 
            style={{ background: '#2563EB', color: '#fff', borderColor: '#2563EB', width: '100%' }} 
            href="/universities" 
            data-testid="button-university-partnerships"
          >
            University Partnerships →
          </a>
        </div>

        {/* Industry Pros */}
        <div 
          className="card" 
          style={{ background: '#F5F3FF', borderColor: '#EDE9FE', padding: 32 }} 
          data-testid="card-professionals"
        >
          <div className="icon-chip icon-purple" style={{ width: '64px', height: '64px', margin: '0 0 20px 0' }}>
            <MicIcon/>
          </div>
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 20 }}>Industry Professionals</h3>
          <p className="lead" style={{ marginBottom: 24, fontSize: 15 }}>
            Join our network of vetted guest speakers and content creators. Share your expertise and connect with the next generation.
          </p>
          <a 
            className="btn btn-purple" 
            style={{ background: '#7C3AED', color: '#fff', borderColor: '#7C3AED', width: '100%' }} 
            href="/professionals" 
            data-testid="button-become-speaker"
          >
            Become a Speaker →
          </a>
        </div>

        {/* Students */}
        <div 
          className="card" 
          style={{ background: '#FFFBEB', borderColor: '#FEF3C7', padding: 32 }} 
          data-testid="card-students"
        >
          <div className="icon-chip icon-amber" style={{ width: '64px', height: '64px', margin: '0 0 20px 0' }}>
            <StudentIcon/>
          </div>
          <h3 style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 20 }}>Student Access</h3>
          <p className="lead" style={{ marginBottom: 24, fontSize: 15 }}>
            Students gain access through their university. Use the access code provided by your school to unlock premium content and events.
          </p>
          <a 
            className="btn btn-amber" 
            style={{ background: '#D97706', color: '#fff', borderColor: '#D97706', width: '100%' }} 
            href="/student-access" 
            data-testid="button-enter-access-code"
          >
            Enter Access Code →
          </a>
        </div>
      </div>
    </section>
  );
}
