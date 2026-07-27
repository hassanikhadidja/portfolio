import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { getProjectCover, getProjectDetail } from '../data/projectDetails';
import { useLocalizedContent } from '../i18n/useLocalizedContent';
import { imgUrl, withCloudinary } from '../utils/media';
import ProjectArrowIcon from '../components/ProjectArrowIcon';
import { Link } from 'react-router-dom';
import './ProjectsHero.css';
import './ProjectsGrid.css';

const CATEGORY_IDS = ['all', 'Website Design & Development', 'Web Design'];

const ICON1 = '/icon1.png';

/** Decorative floating favicons — positions % of section, varied motion. */
const FLOAT_ICON_LAYOUT = [
  { top: '4%', left: '2%', width: 48, animationDelay: '0s', animationDuration: '20s' },
  { top: '12%', right: '4%', left: 'auto', width: 40, animationDelay: '-3s', animationDuration: '17s' },
  { top: '28%', left: '8%', width: 36, animationDelay: '-7s', animationDuration: '22s' },
  { top: '38%', right: '10%', left: 'auto', width: 52, animationDelay: '-2s', animationDuration: '19s' },
  { top: '52%', left: '1%', width: 44, animationDelay: '-11s', animationDuration: '21s' },
  { top: '58%', right: '2%', left: 'auto', width: 38, animationDelay: '-5s', animationDuration: '18s' },
  { top: '72%', left: '14%', width: 42, animationDelay: '-9s', animationDuration: '23s' },
  { top: '82%', right: '12%', left: 'auto', width: 50, animationDelay: '-1s', animationDuration: '16s' },
  { top: '18%', left: '42%', width: 32, animationDelay: '-13s', animationDuration: '24s' },
  { top: '66%', left: '48%', width: 34, animationDelay: '-6s', animationDuration: '20s' },
];

export default function Projects() {
  const { projects, t } = useLocalizedContent();
  const [active, setActive] = useState('all');
  const [hoverCta, setHoverCta] = useState({ visible: false, x: 0, y: 0, cardSlug: '' });

  const categoryLabels = useMemo(
    () => ({
      all: t('projectsPage.all'),
      'Website Design & Development': t('projectsPage.catWebsite'),
      'Web Design': t('projectsPage.catWebDesign'),
    }),
    [t]
  );

  const filtered =
    active === 'all' ? projects : projects.filter((p) => (p.categoryKey || p.category) === active);

  const handleCardHoverMove = (e, slug) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverCta({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      cardSlug: slug,
    });
  };

  const hideCardHover = () => {
    setHoverCta((prev) => ({ ...prev, visible: false }));
  };

  return (
    <PageTransition>
      {/* Hero — radial headline block */}
      <section className="projectsHero" aria-label="Portfolio intro">
        <div className="projectsHero-badge">
          <svg className="projectsHero-badgeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="5" fill="#ccc" />
          </svg>
          {t('projectsPage.recent')}
        </div>

        <div className="projectsHero-headline">
          <span className="projectsHero-line1">
            <span className="projectsHero-textStrong">{t('projectsPage.elevatingStrong')}</span>
            <span className="projectsHero-textMuted"> {t('projectsPage.elevatingMuted')}</span>
          </span>
          <div className="projectsHero-line2">{t('projectsPage.success')}</div>
        </div>

        <Link to="/contact" className="projectsHero-cta">
          <span className="projectsHero-ctaLabel">{t('common.contactNow')}</span>
          <span className="projectsHero-ctaArrow" aria-hidden>
            →
          </span>
        </Link>
      </section>

      {/* Filter + masonry (About-style cards) + floating icons */}
      <section className="projectsPage-gridSection">
        <div className="projectsPage-floatLayer" aria-hidden>
          {FLOAT_ICON_LAYOUT.map((pos, i) => (
            <img
              key={i}
              src={ICON1}
              alt=""
              className="projectsPage-floatIcon"
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                width: pos.width,
                animationDelay: pos.animationDelay,
                animationDuration: pos.animationDuration,
              }}
            />
          ))}
        </div>

        <div className="projectsPage-gridInner">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {CATEGORY_IDS.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '9px 22px',
                  borderRadius: 100,
                  fontFamily: 'DM Sans',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  background: active === cat ? 'var(--accent)' : 'transparent',
                  color: active === cat ? '#0a0a0a' : 'var(--text-muted)',
                  borderColor: active === cat ? 'var(--accent)' : 'var(--border)',
                }}
              >
                {categoryLabels[cat]}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="projectsPage-masonry"
            >
              {filtered.map((p, i) => {
                const cover = getProjectCover(getProjectDetail(p.slug));
                const previewVideo = cover.video
                  ? withCloudinary(cover.video, 'w_900,c_limit,q_auto:eco,vc_auto,f_mp4')
                  : null;
                const preview = cover.image ? imgUrl(cover.image, { width: 900 }) : null;
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    style={{ breakInside: 'avoid', marginBottom: 14 }}
                  >
                    <Link
                      to={`/projects/${p.slug}`}
                      onMouseMove={(e) => handleCardHoverMove(e, p.slug)}
                      onMouseEnter={(e) => handleCardHoverMove(e, p.slug)}
                      onMouseLeave={hideCardHover}
                      style={{
                        position: 'relative',
                        borderRadius: 20,
                        overflow: 'hidden',
                        background: '#101010',
                        border: '1px solid #222',
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      {previewVideo ? (
                        <div style={{ background: '#0f0f0f' }}>
                          <video
                            src={previewVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                      ) : preview ? (
                        <div style={{ background: '#0f0f0f' }}>
                          <img
                            src={preview}
                            alt={p.title}
                            loading={i < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              objectFit: 'contain',
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            minHeight: 210,
                            background: p.color,
                          }}
                        />
                      )}
                      {hoverCta.visible && hoverCta.cardSlug === p.slug && (
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
                      <div style={{ padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                          {p.title} — {p.category}
                        </span>
                        <span
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: '#202020',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                          }}
                        >
                          <ProjectArrowIcon size={15} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
