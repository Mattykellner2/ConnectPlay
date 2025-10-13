import { UniIcon, MicIcon, StudentIcon } from './icons';
import '../styles/global.css';

export default function HomeCards() {
  return (
    <section style={{ background: '#fff', padding: '24px 0 40px' }}>
      <div className="container grid-3">
        {/* Universities */}
        <div className="card" data-testid="card-universities">
          <div className="icon-chip icon-blue"><UniIcon/></div>
          <h3 style={{ margin: '12px 0 8px', fontWeight: 700 }}>For Universities</h3>
          <p className="lead">Partner with us to provide your students with access to industry professionals, curated content, and career opportunities at scale.</p>
          <a 
            className="btn btn-primary" 
            style={{ marginTop: 16, background: '#2563EB', color: '#fff', borderColor: '#2563EB' }} 
            href="/universities" 
            data-testid="button-university-partnerships"
          >
            University Partnerships
          </a>
        </div>

        {/* Industry Pros */}
        <div className="card" data-testid="card-professionals">
          <div className="icon-chip icon-purple"><MicIcon/></div>
          <h3 style={{ margin: '12px 0 8px', fontWeight: 700 }}>Industry Professionals</h3>
          <p className="lead">Join our network of vetted guest speakers and share your expertise with classes that match your experience.</p>
          <a 
            className="btn btn-purple" 
            style={{ marginTop: 16, background: '#7C3AED', color: '#fff', borderColor: '#7C3AED' }} 
            href="/professionals" 
            data-testid="button-become-speaker"
          >
            Become a Speaker
          </a>
        </div>

        {/* Students */}
        <div className="card" data-testid="card-students">
          <div className="icon-chip icon-amber"><StudentIcon/></div>
          <h3 style={{ margin: '12px 0 8px', fontWeight: 700 }}>Student Access</h3>
          <p className="lead">Students gain access through their university, use access codes provided by your school to join, and connect with verified experts.</p>
          <a 
            className="btn btn-amber" 
            style={{ marginTop: 16, background: '#F59E0B', color: '#fff', borderColor: '#F59E0B' }} 
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
