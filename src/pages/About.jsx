import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import AboutHeroSection from '../components/AboutHeroSection';
import { useLanguage } from '../i18n/LanguageContext';
import { imgUrl } from '../utils/media';
import ProjectArrowIcon from '../components/ProjectArrowIcon';
import './ProjectsHero.css';
import './AboutPage.css';

const showcaseBase = [
  {
    slug: 'badee-beauty',
    name: 'Badee Beauty',
    stackKey: 'website',
    bg: 'linear-gradient(135deg, #1a0a14 0%, #2d1522 45%, #0f080c 100%)',
    title: 'BADEE',
    image: 'https://res.cloudinary.com/dbtkfjrvd/image/upload/v1778715273/Design_sans_titre_19_y1fvkv.png',
  },
  {
    slug: 'bel-nco',
    name: 'BEL*NCO',
    stackKey: 'landing',
    bg: 'linear-gradient(145deg, #252320 0%, #3a3632 50%, #181716 100%)',
    title: 'DOUBLE CLEANSING',
    image: 'https://res.cloudinary.com/dbtkfjrvd/image/upload/v1778710739/Design_sans_titre_16_kzdgz0.png',
  },
  {
    slug: 'digital-wedding-invitation-templates',
    name: 'Digital Wedding Invitation Templates',
    stackKey: 'website',
    bg: 'linear-gradient(135deg, #2d1f38 0%, #4a3a5c 50%, #1e1528 100%)',
    title: 'ALEX & DIANE',
    image: 'https://res.cloudinary.com/dbtkfjrvd/image/upload/v1778697569/Ajouter_un_titre_tupasa.png',
  },
  {
    slug: 'florea-paris-florist',
    name: 'Floréa',
    stackKey: 'website',
    bg: 'linear-gradient(135deg, #3d2a35 0%, #5c4458 45%, #1f1419 100%)',
    title: 'FLORÉA',
    // Static cover (not coverVideo) so masonry cards match siblings — video left empty black under the frame
    image:
      'https://res.cloudinary.com/dbtkfjrvd/video/upload/so_1,w_1200,f_jpg,q_auto/v1779926887/Design_sans_titre_11_u1pm7i.jpg',
  },
];

export default function About() {
  const { t } = useLanguage();
  const [hoverCta, setHoverCta] = useState({ visible: false, x: 0, y: 0, cardName: '' });

  const showcaseProjects = useMemo(
    () =>
      showcaseBase.map((p) => ({
        ...p,
        stack: p.stackKey === 'landing' ? t('about.stackLanding') : t('about.stackWebsite'),
      })),
    [t]
  );

  const valueCards = useMemo(() => {
    const cards = t('about.valueCards');
    const list = Array.isArray(cards) ? cards : [];
    return [
      list.slice(0, 2).map((c) => ({ mark: '✓', ...c })),
      list.slice(2, 4).map((c) => ({ mark: '✓', ...c })),
      list.slice(4, 6).map((c) => ({ mark: '✓', ...c })),
    ];
  }, [t]);

  const handleProjectHoverMove = (e, cardName) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    setHoverCta({
      visible: true,
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top,
      cardName,
    });
  };

  const hideProjectHover = () => {
    setHoverCta((prev) => ({ ...prev, visible: false }));
  };

  return (
    <PageTransition>
      <AboutHeroSection />

      <section className="aboutPage-showcase" style={{ padding: '96px 5%', background: '#050505', borderTop: '1px solid #1d1d1d' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <ScrollReveal>
            <div className="aboutPage-showcaseTitle" style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 60px)', color: '#fff', lineHeight: 1.15 }}>{t('about.workingOn')}</h2>
            </div>
          </ScrollReveal>
          <p className="aboutPage-showcaseLead" style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 620, margin: '0 auto 26px', textAlign: 'center' }}>
            {t('about.showcaseLead')}
          </p>
          <div style={{ columnCount: 2, columnGap: 14 }}>
            {showcaseProjects.map((p) => (
              <ScrollReveal key={p.slug}>
                <div style={{ breakInside: 'avoid', marginBottom: 14 }}>
                  <Link
                    to={`/projects/${p.slug}`}
                    onMouseMove={(e) => handleProjectHoverMove(e, p.name)}
                    onMouseEnter={(e) => handleProjectHoverMove(e, p.name)}
                    onMouseLeave={hideProjectHover}
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
                    {p.video ? (
                      <div style={{ background: '#0f0f0f' }}>
                        <video
                          src={p.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    ) : p.image ? (
                      <div style={{ background: '#0f0f0f' }}>
                        <img
                          src={imgUrl(p.image, { width: 900 })}
                          alt={p.name}
                          loading="lazy"
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
                          background: p.bg,
                        }}
                      />
                    )}
                    {hoverCta.visible && hoverCta.cardName === p.name && (
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
                        {p.name} — {p.stack}
                      </span>
                      <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#202020', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <ProjectArrowIcon size={15} />
                      </span>
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="aboutPage-showcaseCta" style={{ textAlign: 'center', marginTop: 28 }}>
            <Link to="/projects" className="btn-outline">{t('common.viewProjects')}</Link>
          </div>
        </div>
      </section>

      <section className="aboutPage-why" style={{ padding: '96px 5%', borderTop: '1px solid #1d1d1d', background: '#090909' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <ScrollReveal>
            <div className="aboutPage-whyHead" style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="section-label block mb-4">{t('about.whyChoose')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 60px)', color: '#fff', lineHeight: 1.15 }}>{t('about.whyPartner')}</h2>
            </div>
          </ScrollReveal>

          <p className="aboutPage-whyLead" style={{ color: 'var(--text-muted)', textAlign: 'center', margin: '0 auto 24px', maxWidth: 560 }}>
            {t('about.whyPartnerLead')}
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {valueCards.map((pair, idx) => (
              <ScrollReveal key={idx}>
                <article style={{ border: '1px solid #252525', borderRadius: 20, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
                  {pair.map((item, i) => (
                    <div key={item.title} style={{ background: '#111', padding: 26, borderRight: i === 0 ? '1px solid #252525' : 'none' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #3a3a3a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: item.mark === '✕' ? '#8e8e8e' : '#d7d7d7' }}>
                        {item.mark}
                      </div>
                      <h3 style={{ color: '#fff', fontSize: 21, marginBottom: 10 }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.75 }}>{item.text}</p>
                    </div>
                  ))}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
