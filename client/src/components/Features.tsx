import { MicIcon, CalendarIcon, ChartIcon } from './icons';

export default function Features() {
  const feats = [
    { title: 'Verified Speakers', text: 'Curated network of industry professionals across sports, media, and entertainment.', chip: 'icon-blue', Icon: MicIcon },
    { title: 'Easy Booking', text: 'Streamlined booking process with confirmed availability and automated reminders.', chip: 'icon-green', Icon: CalendarIcon },
    { title: 'Measurable Impact', text: 'Track attendance, engagement, and student outcomes with detailed reporting.', chip: 'icon-purple', Icon: ChartIcon },
  ];
  
  return (
    <section style={{ background: '#fff', padding: '80px 0 100px' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 56, fontSize: 36 }}>Complete Platform for Academic-Industry Connections</h2>
        <div className="grid-3" style={{ gap: 48, textAlign: 'center' }}>
          {feats.map(({ title, text, chip, Icon }) => (
            <div key={title} data-testid={`feature-${title.toLowerCase().replace(' ', '-')}`}>
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
