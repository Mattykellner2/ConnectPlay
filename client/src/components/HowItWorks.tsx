import { BuildingIcon, KeyIcon, CalendarIcon, ChartIcon } from './icons';

export default function HowItWorks() {
  const items = [
    { title: '1. University Partners', text: 'Universities sign up and choose their partnership package.', chip: 'icon-blue', Icon: BuildingIcon },
    { title: '2. Access Codes', text: 'Universities generate access codes for their students to create accounts.', chip: 'icon-green', Icon: KeyIcon },
    { title: '3. Book & Access', text: 'Universities book speakers while students access content and events.', chip: 'icon-purple', Icon: CalendarIcon },
    { title: '4. Track Impact', text: 'Universities track student engagement and program outcomes.', chip: 'icon-amber', Icon: ChartIcon },
  ];
  
  return (
    <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 56, fontSize: 36 }}>How ConnectPlay Works</h2>
        <div className="grid-4" style={{ gap: 40 }}>
          {items.map(({ title, text, chip, Icon }) => (
            <div key={title} style={{ textAlign: 'center' }} data-testid={`step-${title.charAt(0)}`}>
              <div className={`icon-chip ${chip}`} style={{ width: '64px', height: '64px', margin: '0 auto 20px' }}>
                <Icon/>
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{title}</div>
              <div className="lead" style={{ fontSize: 15 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
