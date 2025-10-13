import { MicIcon, CalendarIcon, ChartIcon } from './icons';

export default function Features() {
  const feats = [
    { title: 'Verified Speakers', text: 'Curated network of industry professionals across sports, media, and entertainment.', chip: 'icon-purple', Icon: MicIcon },
    { title: 'Easy Booking', text: 'Streamlined booking process with confirmed availability and automated reminders.', chip: 'icon-green', Icon: CalendarIcon },
    { title: 'Measurable Impact', text: 'Track attendance, engagement, and student outcomes with detailed reporting.', chip: 'icon-blue', Icon: ChartIcon },
  ];
  
  return (
    <section style={{ background: '#fff', padding: '24px 0 40px' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>Complete Platform for Academic-Industry Connections</h2>
        <div className="grid-3" style={{ marginTop: 28, textAlign: 'center' }}>
          {feats.map(({ title, text, chip, Icon }) => (
            <div key={title} data-testid={`feature-${title.toLowerCase().replace(' ', '-')}`}>
              <div className={`icon-chip ${chip}`}><Icon/></div>
              <div style={{ fontWeight: 700, margin: '10px 0 6px' }}>{title}</div>
              <div className="lead" style={{ fontSize: 15 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
