import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProjectCover, getProjectDetail } from '../data/projectDetails';
import { useLanguage } from '../i18n/LanguageContext';

export default function ProjectCard({ project, index = 0, large = false }) {
  const { t } = useLanguage();
  const [hoverCta, setHoverCta] = useState({ visible: false, x: 0, y: 0 });
  const cover = getProjectCover(getProjectDetail(project.slug));
  const previewVideo = cover.video;
  const preview = cover.image;

  const cardRadius = large ? 28 : 20;
  const footerPad = large ? 22 : 16;
  const footerFont = large ? 15 : 13;
  const arrowSize = large ? 40 : 32;
  const fallbackMinH = large ? 320 : 210;
  const mediaMinH = large ? 360 : undefined;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverCta({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hideHover = () => {
    setHoverCta((prev) => ({ ...prev, visible: false }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.06 }}
      style={{ breakInside: 'avoid', marginBottom: large ? 28 : 14 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        onMouseMove={handleMove}
        onMouseEnter={handleMove}
        onMouseLeave={hideHover}
        style={{
          position: 'relative',
          borderRadius: cardRadius,
          overflow: 'hidden',
          background: '#101010',
          border: '1px solid #222',
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {previewVideo ? (
          <div style={{ background: '#0f0f0f', minHeight: mediaMinH }}>
            <video
              src={previewVideo}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                minHeight: mediaMinH,
                display: 'block',
                objectFit: large ? 'cover' : 'contain',
              }}
            />
          </div>
        ) : preview ? (
          <div style={{ background: '#0f0f0f', minHeight: mediaMinH }}>
            <img
              src={preview}
              alt={project.title}
              style={{
                width: '100%',
                height: 'auto',
                minHeight: mediaMinH,
                display: 'block',
                objectFit: large ? 'cover' : 'contain',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              minHeight: fallbackMinH,
              background: project.color,
            }}
          />
        )}
        {hoverCta.visible && (
          <div
            style={{
              position: 'absolute',
              left: hoverCta.x,
              top: hoverCta.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              background: 'rgba(8,8,8,0.62)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff',
              borderRadius: 9999,
              padding: '10px 16px',
              fontSize: 12,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 4,
              whiteSpace: 'nowrap',
            }}
          >
            {t('common.viewProject')}
          </div>
        )}
        <div style={{ padding: footerPad, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: footerFont }}>
            {project.title} — {project.category}
          </span>
          <span
            style={{
              width: arrowSize,
              height: arrowSize,
              borderRadius: '50%',
              background: '#202020',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: large ? 16 : 14,
            }}
          >
            ↗
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
