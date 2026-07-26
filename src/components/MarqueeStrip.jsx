export default function MarqueeStrip({ items, direction = 'left', accent = true }) {
  const repeated = [...items, ...items, ...items, ...items];
  const cls = direction === 'left' ? 'marquee-l' : 'marquee-r';

  return (
    <div className="overflow-hidden py-4">
      <div className={`flex whitespace-nowrap ${cls}`} style={{ width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-6"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: accent ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            {item}
            <span style={{ color: 'var(--text-muted)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
