import { motion } from 'framer-motion';

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
      whileHover={{ y: -3, borderColor: 'rgba(245,230,200,0.25)' }}
      className="glass rounded-xl flex flex-col"
      style={{
        transition: 'border-color 0.3s, transform 0.3s',
        padding: '16px 16px 14px',
        gap: 8,
      }}
    >
      <div className="flex items-start justify-end">
        <span className="section-label" style={{ color: 'var(--text-muted)', fontSize: 11 }}>{service.number}</span>
      </div>
      <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
        {service.title}
      </h3>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55 }}>
        {service.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {service.platforms.map(p => (
          <span
            key={p}
            style={{
              padding: '3px 9px',
              borderRadius: 9999,
              background: 'rgba(245,230,200,0.08)',
              color: 'var(--accent)',
              border: '1px solid rgba(245,230,200,0.12)',
              fontFamily: 'DM Sans',
              fontSize: 10,
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
