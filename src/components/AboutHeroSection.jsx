import ScrollReveal from './ScrollReveal';
import { designer } from '../data/content';
import { useLocalizedContent } from '../i18n/useLocalizedContent';
import { imgUrl } from '../utils/media';
import '../pages/ProjectsHero.css';
import '../pages/AboutPage.css';

function AboutSocialIcon({ href, label, children, download }) {
  const isExternal = href && href.startsWith('http');
  return (
    <a
      href={href || '#'}
      download={download ? designer.cvFileName : undefined}
      target={isExternal && !download ? '_blank' : undefined}
      rel={isExternal && !download ? 'noopener noreferrer' : undefined}
      aria-label={label}
      style={{
        width: 42,
        height: 42,
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 10,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.84)',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}

export default function AboutHeroSection({ padding = '130px 5% 96px', className = '' }) {
  const { designer: d, projects, t } = useLocalizedContent();
  const aboutSkills = t('aboutHero.skills');

  return (
    <section className={`aboutHero-section ${className}`.trim()} style={{ padding, background: '#070707' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <ScrollReveal>
          <div className="aboutHero-intro" style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="aboutHero-badgeWrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div className="projectsHero-badge" style={{ marginBottom: 0 }}>
                <svg className="projectsHero-badgeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="5" fill="#ccc" />
                </svg>
                {t('aboutHero.badge')}
              </div>
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 68px)', color: 'var(--text-primary)', lineHeight: 1.05 }}>
              {designer.name} <span style={{ color: 'var(--text-muted)' }}>, {t('aboutHero.role')}</span>
            </h1>
            <p style={{ marginTop: 14, color: 'var(--text-muted)', fontSize: 15 }}>
              {t('aboutHero.lead')}
            </p>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          <ScrollReveal direction="left">
            <div style={{ background: '#101010', border: '1px solid #222', borderRadius: 20, padding: 14 }}>
              <div className="aboutHero-photoFrame" style={{ minHeight: 430, borderRadius: 14, position: 'relative', overflow: 'hidden', background: '#1a1a1a' }}>
                <img
                  src={imgUrl(designer.aboutPhoto, { width: 900 })}
                  alt={`${designer.name} portrait`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,12,12,0.92) 0%, rgba(12,12,12,0.25) 50%, rgba(12,12,12,0.15) 100%)' }} />
                <div style={{ position: 'absolute', left: 14, bottom: 14, display: 'inline-flex', alignItems: 'center', gap: 8, zIndex: 1 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{t('common.availableForWork')}</span>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: '0 4px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, color: '#fff' }}>
                  {t('aboutHero.hello')} {designer.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 2 }}>
                  {t('aboutHero.role')}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16, padding: '0 4px' }}>
                <AboutSocialIcon href={designer.socials.instagram} label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </AboutSocialIcon>
                <AboutSocialIcon href={designer.socials.linkedin} label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </AboutSocialIcon>
                <AboutSocialIcon href="https://github.com/hassanikhadidja" label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.82c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.59 17.52 2 12 2z" />
                  </svg>
                </AboutSocialIcon>
                <AboutSocialIcon href={designer.cvUrl} label={t('common.downloadCv')} download>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                </AboutSocialIcon>
              </div>

              <a href="https://tally.so/r/2EOglL" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginTop: 18, width: '100%', textAlign: 'center' }}>
                {t('common.projectInquiry')}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div style={{ background: '#101010', border: '1px solid #222', borderRadius: 20, padding: 28, height: '100%' }}>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 18, lineHeight: 1.8 }}>{d.bioLong}</p>

              <div style={{ borderTop: '1px solid #252525', margin: '24px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(Array.isArray(aboutSkills) ? aboutSkills : []).map((s) => (
                  <span key={s} style={{ background: '#1b1b1b', border: '1px solid #333', borderRadius: 8, padding: '8px 14px', fontSize: 14, color: 'rgba(255,255,255,0.88)' }}>
                    {s}
                  </span>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #252525', margin: '24px 0' }} />
              <div>
                {projects.slice(0, 4).map((p) => (
                  <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 14, marginBottom: 10, background: '#151515', border: '1px solid #242424', borderRadius: 12, padding: '14px 16px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{p.category}</span>
                    <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>{p.title}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{p.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
