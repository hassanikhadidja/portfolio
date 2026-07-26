import { useId, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { getProjectDetail, getRelatedProjects } from '../data/projectDetails';
import { useLanguage } from '../i18n/LanguageContext';
import { localizeProjectDetail } from '../i18n/useLocalizedContent';

const serif = "'Cormorant Garamond', serif";
const display = "'Bebas Neue', sans-serif";
const sans = "'DM Sans', sans-serif";
const muted = '#9a9590';
const muted2 = '#7a7570';
const cardBg = '#111';
const border = '#1e1e1e';

/** Goal / process / result media: same width as the result video (full content column, no 900px cap on laptop). */
const caseStudyMediaFrame = {
  marginTop: 28,
  width: '100%',
  borderRadius: 12,
  overflow: 'hidden',
  border: '1px solid #222',
};

const caseStudyVideoFrame = { ...caseStudyMediaFrame, background: '#000' };

/** Silver glowy line icons — goal / process / result share the same stroke language. */
function CaseSectionIcon({ variant }) {
  const gid = useId().replace(/:/g, '');
  const gradId = `case-silver-${variant}-${gid}`;
  const glowStyle = {
    filter:
      'drop-shadow(0 0 3px rgba(230, 230, 245, 0.55)) drop-shadow(0 0 10px rgba(160, 165, 190, 0.35)) drop-shadow(0 0 18px rgba(120, 125, 150, 0.2))',
  };
  const stroke = `url(#${gradId})`;
  const sw = 1.35;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden style={glowStyle}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8f8ff" />
          <stop offset="38%" stopColor="#c4c4d4" />
          <stop offset="72%" stopColor="#8f8fa0" />
          <stop offset="100%" stopColor="#6a6a7a" />
        </linearGradient>
      </defs>

      {variant === 'goal' && (
        <g stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="4.75" />
          <circle cx="12" cy="12" r="2.15" fill={stroke} fillOpacity="0.35" stroke="none" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2" strokeWidth="1.05" opacity="0.9" />
          <path d="M5.5 5.5l1.6 1.6M17 17l1.6 1.6M17 5.5l-1.6 1.6M5.5 17l1.6-1.6" strokeWidth="1" opacity="0.55" />
        </g>
      )}

      {variant === 'process' && (
        <g stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="8" r="2.35" />
          <circle cx="18" cy="8" r="2.35" />
          <circle cx="12" cy="17.5" r="2.35" />
          <path d="M7.8 9.4C9.2 11.2 10.8 12 12 12s2.8-.8 4.2-2.6" />
          <path d="M7.2 10.2L10.5 15.2" />
          <path d="M16.8 10.2L13.5 15.2" />
          <path
            d="M12 3.5c-1.2 0-2.2 1-2.2 2.2v1.1M12 3.5c1.2 0 2.2 1 2.2 2.2v1.1"
            strokeWidth="1.1"
            opacity="0.75"
          />
        </g>
      )}

      {variant === 'result' && (
        <g stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="5.85" opacity="0.4" />
          <path d="M7.15 12.1l2.75 2.7 6.95-8.35" strokeWidth="1.65" />
          <path d="M5.2 5.2l1.35 1.35M17.45 17.45l1.35 1.35M18.8 5.2l-1.35 1.35M5.2 18.8l1.35-1.35" strokeWidth="1" opacity="0.45" />
        </g>
      )}
    </svg>
  );
}

function ContentCard({ icon, number, title, children }) {
  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: 16,
        padding: 'clamp(28px, 5vw, 48px)',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          border: '1px solid rgba(200, 200, 220, 0.22)',
          background: 'linear-gradient(155deg, rgba(48, 48, 56, 0.95) 0%, rgba(22, 22, 28, 0.98) 100%)',
          boxShadow:
            '0 0 24px rgba(170, 175, 200, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.07), inset 0 -1px 0 rgba(0, 0, 0, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 28,
          height: 28,
          border: '1px solid #2a2a2a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          color: '#555',
        }}
      >
        {number}
      </div>
      <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px, 4vw, 32px)', fontWeight: 600, color: '#fff', marginBottom: 16 }}>{title}</h2>
      {children}
    </div>
  );
}

function ProductDemoStrip() {
  const row = [
    { label: 'Featured item', oldP: '$56', newP: '$45' },
    { label: 'Featured item', oldP: '$67', newP: '$56' },
    { label: 'Featured item', oldP: '$56', newP: '$45' },
    { label: 'Featured item', oldP: '$67', newP: '$56' },
  ];
  return (
    <div style={{ marginTop: 28 }}>
      <div
        style={{
          background: 'linear-gradient(160deg, #1e1e1e 0%, #141414 100%)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div style={{ height: 120, background: 'linear-gradient(180deg,#2a2a2a 0%,#141414 100%)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', borderTop: '1px solid #222' }}>
          {row.map((cell, i) => (
            <div key={i} style={{ padding: 16, borderRight: i < row.length - 1 ? '1px solid #1e1e1e' : 'none' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{cell.label}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: '#555', textDecoration: 'line-through' }}>{cell.oldP}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#e8e6e1', letterSpacing: '0.02em' }}>{cell.newP}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, padding: 16 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: '9/14',
                background: ['linear-gradient(160deg,#1c1c1c,#2a2a2a)', 'linear-gradient(160deg,#1a1a22,#22222a)', 'linear-gradient(160deg,#1e1a1a,#2a2020)', 'linear-gradient(160deg,#1a1e1a,#202a20)'][i],
                borderRadius: 8,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  background: 'rgba(255,255,255,.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '6px 0 6px 10px', borderColor: 'transparent transparent transparent #000', marginLeft: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessGrid() {
  const blocks = [
    { bg: 'linear-gradient(160deg,#1a1a1a,#242424)', label: 'NEW ELEGANT\nCOLLECTION', foot: 'Pure Black Collection' },
    { bg: 'linear-gradient(160deg,#1e1e1e,#282828)', center: 'Build your\nDigital Product\nBusiness' },
    { bg: 'linear-gradient(160deg,#1a1a20,#22222a)', center: '' },
    { bg: 'linear-gradient(160deg,#201a1a,#2a2020)', center: '' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginTop: 28 }}>
      {blocks.map((b, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '3/4',
            background: b.bg,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {b.label && (
            <>
              <div style={{ fontFamily: display, fontSize: 18, color: '#333', textAlign: 'center', padding: 10, whiteSpace: 'pre-line' }}>{b.label}</div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 8, color: '#444' }}>{b.foot}</div>
            </>
          )}
          {b.center && (
            <div style={{ fontSize: 10, color: '#333', textAlign: 'center', padding: 10, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{b.center}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function ResultsCollage({ heroTitle }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 12,
        marginTop: 28,
        borderRadius: 12,
        overflow: 'hidden',
        minHeight: 280,
      }}
    >
      <div
        style={{
          flex: 1,
          background: '#1a1a1a',
          borderRadius: 8,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 20,
          minHeight: 260,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ fontFamily: display, fontSize: 'clamp(48px, 12vw, 100px)', color: 'rgba(255,255,255,.04)', lineHeight: 0.9, transform: 'rotate(-5deg)', textAlign: 'center' }}>
            VIBE
            <br />
            REFLECT
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', marginBottom: 6 }}>
            FASHION ISN&apos;T STATIC—IT MOVES, FLOWS, AND COMMANDS ATTENTION
          </div>
          <div style={{ fontFamily: display, fontSize: 20, color: '#e8e6e1', lineHeight: 1.2 }}>
            MOVEMENT IN FORM
            <br />
            <span style={{ fontSize: 14, fontFamily: sans, fontWeight: 300, color: '#555' }}>
              IN MOTION—BOLD SILHOUETTES, STRUCTURED DRAPING,
              <br />
              CAPTURED IN EVERY DROP
            </span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ flex: 1, background: '#1a1a1a', borderRadius: 8, overflow: 'hidden', position: 'relative', minHeight: 120 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(160deg,#1e1e1e,#2a2a2a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Brand rhythm</div>
              <div style={{ fontFamily: display, fontSize: 'clamp(28px, 5vw, 42px)', color: '#fff', lineHeight: 1 }}>
                STYLE
                <br />
                VIBE
                <br />
                REFLECT
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, background: '#111', borderRadius: 8, overflow: 'hidden', position: 'relative', minHeight: 120 }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: display, fontSize: 'clamp(28px, 6vw, 54px)', color: '#e8e6e1', whiteSpace: 'nowrap', padding: '0 20px' }}>{heroTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const rawDetail = slug ? getProjectDetail(slug) : null;
  const detail = useMemo(() => localizeProjectDetail(rawDetail, lang), [rawDetail, lang]);
  const [hoverCta, setHoverCta] = useState({ visible: false, x: 0, y: 0, cardSlug: '' });

  const related = useMemo(
    () =>
      getRelatedProjects(slug, 4).map((r) => ({
        ...r,
        stack:
          lang === 'fr'
            ? r.stack === 'Landing page'
              ? t('about.stackLanding')
              : t('about.stackWebsite')
            : r.stack,
      })),
    [slug, lang, t]
  );

  if (!detail) {
    return <Navigate to="/projects" replace />;
  }

  const handleProjectHoverMove = (e, cardSlug) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    setHoverCta({
      visible: true,
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top,
      cardSlug,
    });
  };
  const hideProjectHover = () => {
    setHoverCta((prev) => ({ ...prev, visible: false }));
  };
  const liveUrl = detail.liveUrl;
  const heroImage = detail.heroFrameImage;
  const gradient = detail.heroGradient || 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)';

  return (
    <PageTransition>
      <div style={{ background: '#0a0a0a', color: '#e8e6e1', fontFamily: sans }}>
        <section style={{ padding: 'clamp(100px, 14vw, 140px) clamp(24px, 6vw, 80px) clamp(48px, 8vw, 80px)' }}>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              color: '#b0aba3',
              textDecoration: 'none',
              marginBottom: 36,
            }}
          >
            {t('projectDetail.back')}
          </Link>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 'clamp(40px, 8vw, 80px)',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flex: '1 1 320px', maxWidth: 540 }}>
              <h1 style={{ fontFamily: serif, fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 600, lineHeight: 1, color: '#fff', marginBottom: 28 }}>
                {detail.heroTitle}
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: muted, maxWidth: 480, marginBottom: 40, whiteSpace: 'pre-line' }}>{detail.heroDesc}</p>
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#1e1e1e',
                    border: '1px solid #333',
                    borderRadius: 50,
                    padding: '14px 28px',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#fff',
                    textDecoration: 'none',
                    transition: 'background .2s',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10,8 16,12 10,16" />
                  </svg>
                  {t('projectDetail.livePreview')}
                </a>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#161616',
                    border: '1px solid #2a2a2a',
                    borderRadius: 50,
                    padding: '14px 28px',
                    fontSize: 14,
                    color: '#666',
                  }}
                >
                  {t('projectDetail.liveOnRequest')}
                </span>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px, 8vw, 60px)', marginTop: 52 }}>
                <div>
                  <span style={{ fontSize: 12, color: '#5a5650', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>{t('projectDetail.client')}</span>
                  <span style={{ fontSize: 15, color: '#e8e6e1' }}>{detail.client}</span>
                </div>
                <div>
                  <span style={{ fontSize: 12, color: '#5a5650', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>{t('projectDetail.service')}</span>
                  <span style={{ fontSize: 15, color: '#e8e6e1' }}>{detail.serviceProvided}</span>
                </div>
              </div>
            </div>

            <div style={{ flex: '1 1 300px', maxWidth: 580, width: '100%' }}>
              <div style={{ background: '#111', borderRadius: 16, overflow: 'hidden', border: '1px solid #222', boxShadow: '0 40px 80px rgba(0,0,0,.6)' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                    padding: '8px 20px',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#666',
                    textAlign: 'center',
                  }}
                >
                  {detail.mockupTicker}
                </div>
                <div style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #222', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: 16, fontSize: 10, color: '#888' }}>
                    <span style={{ color: '#fff' }}>{t('projectDetail.mockHome')}</span>
                    <span>{t('projectDetail.mockWork')}</span>
                    <span>{t('projectDetail.mockAbout')}</span>
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, letterSpacing: -1, color: '#fff' }}>{detail.mockupBrandWord}</div>
                  <div style={{ width: 48 }} />
                </div>
                <div style={{ width: '100%', aspectRatio: '16/10', background: '#000', overflow: 'hidden', position: 'relative' }}>
                  {detail.heroFrameVideo ? (
                    <video
                      src={detail.heroFrameVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : heroImage ? (
                    <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                      <div style={{ fontFamily: display, fontSize: 'clamp(36px, 8vw, 52px)', color: '#fff', textAlign: 'center', lineHeight: 1 }}>{detail.heroTitle}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(48px, 8vw, 80px)' }}>
          <ScrollReveal>
            <ContentCard icon={<CaseSectionIcon variant="goal" />} number="1" title={t('projectDetail.theGoal')}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: muted2, maxWidth: 900, whiteSpace: 'pre-line' }}>{detail.goalText}</p>
              {detail.goalVideo ? (
                <div style={caseStudyVideoFrame}>
                  <video
                    src={detail.goalVideo}
                    playsInline
                    {...(detail.goalVideoAmbient
                      ? { autoPlay: true, muted: true, loop: true, controls: false }
                      : { controls: true })}
                    style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top' }}
                  />
                </div>
              ) : detail.goalImage ? (
                <div style={caseStudyMediaFrame}>
                  <img src={detail.goalImage} alt="" style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top' }} />
                </div>
              ) : null}
              {detail.showEcommerceDemo ? <ProductDemoStrip /> : null}
            </ContentCard>
          </ScrollReveal>
        </section>

        <section style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(48px, 8vw, 80px)' }}>
          <ScrollReveal>
            <ContentCard icon={<CaseSectionIcon variant="process" />} number="2" title={t('projectDetail.theProcess')}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: muted2, maxWidth: 900, whiteSpace: 'pre-line' }}>{detail.processText}</p>
              {detail.processVideo ? (
                <div style={caseStudyVideoFrame}>
                  <video
                    src={detail.processVideo}
                    playsInline
                    {...(detail.processVideoAmbient
                      ? { autoPlay: true, muted: true, loop: true, controls: false }
                      : { controls: true })}
                    style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top' }}
                  />
                </div>
              ) : detail.processImage ? (
                <div style={caseStudyMediaFrame}>
                  <img src={detail.processImage} alt="" style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top' }} />
                </div>
              ) : (
                <ProcessGrid />
              )}
            </ContentCard>
          </ScrollReveal>
        </section>

        <section style={{ padding: '0 clamp(24px, 6vw, 80px) clamp(64px, 10vw, 100px)' }}>
          <ScrollReveal>
            <ContentCard icon={<CaseSectionIcon variant="result" />} number="3" title={t('projectDetail.theResult')}>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: muted2, maxWidth: 900, whiteSpace: 'pre-line' }}>{detail.resultText}</p>
              {detail.resultVideo ? (
                <div style={caseStudyVideoFrame}>
                  <video
                    src={detail.resultVideo}
                    playsInline
                    {...(detail.resultVideoAmbient
                      ? { autoPlay: true, muted: true, loop: true, controls: false }
                      : { controls: true })}
                    style={{ width: '100%', height: 'auto', display: 'block', verticalAlign: 'top' }}
                  />
                </div>
              ) : (
                <ResultsCollage heroTitle={detail.heroTitle} />
              )}
            </ContentCard>
          </ScrollReveal>
        </section>

        <section style={{ padding: '96px 5%', background: '#050505', borderTop: '1px solid #1d1d1d' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto' }}>
            <ScrollReveal>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 60px)', color: '#fff' }}>{t('projectDetail.otherProjects')}</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 620, margin: '0 auto 26px', textAlign: 'center' }}>
                More selected work — open any card for the full case study.
              </p>
              <div style={{ columnCount: 2, columnGap: 14 }}>
                {related.map((r) => (
                  <ScrollReveal key={r.slug}>
                    <div style={{ breakInside: 'avoid', marginBottom: 14 }}>
                      <Link
                        to={`/projects/${r.slug}`}
                        onMouseMove={(e) => handleProjectHoverMove(e, r.slug)}
                        onMouseEnter={(e) => handleProjectHoverMove(e, r.slug)}
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
                        {r.video ? (
                          <div style={{ background: '#0f0f0f' }}>
                            <video
                              src={r.video}
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
                        ) : r.image ? (
                          <div style={{ background: '#0f0f0f' }}>
                            <img
                              src={r.image}
                              alt={r.name}
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
                              background: r.bg,
                            }}
                          />
                        )}
                        {hoverCta.visible && hoverCta.cardSlug === r.slug && (
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
                            {r.name} — {r.stack}
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
                            ↗
                          </span>
                        </div>
                      </Link>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <Link to="/projects" className="btn-outline">
                  {t('common.viewProjects')}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
