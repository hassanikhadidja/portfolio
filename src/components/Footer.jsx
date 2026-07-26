import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { designer } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';

const rotatingWordsByLang = {
  en: ['build', 'create', 'design'],
  fr: ['rapide', 'moderne', 'performant', 'unique', 'incroyable'],
};

const socialButtonStyle = {
  width: 40,
  height: 40,
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,255,255,0.78)',
  textDecoration: 'none',
  transition: 'border-color 0.2s ease, color 0.2s ease',
};

function FooterSocialIcon({ children, href = '#', label = 'Social link', download }) {
  const isExternal = typeof href === 'string' && href.startsWith('http');
  return (
    <a
      href={href}
      download={download ? designer.cvFileName : undefined}
      target={isExternal && !download ? '_blank' : undefined}
      rel={isExternal && !download ? 'noopener noreferrer' : undefined}
      style={socialButtonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
        e.currentTarget.style.color = 'rgba(255,255,255,1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.78)';
      }}
      aria-label={label}
    >
      {children}
    </a>
  );
}

function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t('footer.language')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 9999,
        padding: 3,
        gap: 2,
      }}
    >
      {[
        { id: 'en', label: 'EN' },
        { id: 'fr', label: 'FR' },
      ].map((opt) => {
        const active = lang === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLang(opt.id)}
            aria-pressed={active}
            style={{
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              letterSpacing: '0.06em',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 9999,
              background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.55)',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Footer() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();
  const rotatingWords = rotatingWordsByLang[lang] || rotatingWordsByLang.en;
  const [wordIndex, setWordIndex] = useState(0);
  const [wordPhase, setWordPhase] = useState('in');
  const currentWord = rotatingWords[wordIndex % rotatingWords.length];
  const maxWordLength = useMemo(
    () => rotatingWords.reduce((max, word) => Math.max(max, word.length), 0),
    [lang]
  );

  useEffect(() => {
    setWordIndex(0);
    setWordPhase('in');
  }, [lang]);

  useEffect(() => {
    let phaseTimer;
    const timer = setInterval(() => {
      setWordPhase('out');
      phaseTimer = window.setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setWordPhase('in');
      }, 280);
    }, 2200);

    return () => {
      clearInterval(timer);
      if (phaseTimer) window.clearTimeout(phaseTimer);
    };
  }, [rotatingWords.length]);

  const animatedWordStyle = {
    display: 'inline-block',
    minWidth: `${maxWordLength + 1}ch`,
    transform: wordPhase === 'out' ? 'translateY(-90%)' : 'translateY(0)',
    opacity: wordPhase === 'out' ? 0 : 1,
    transition: 'transform 0.28s ease, opacity 0.28s ease',
  };

  const headlineStyle = {
    fontFamily: 'Playfair Display, serif',
    fontSize: 'clamp(42px, 7.5vw, 112px)',
    lineHeight: 1,
  };

  return (
    <>
      <section
        style={{
          background:
            'radial-gradient(ellipse 100% 85% at 50% 40%, rgba(52,52,52,0.52) 0%, rgba(20,20,20,0.8) 58%, #090909 100%)',
          padding: '56px 5% 48px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 9999,
                padding: '6px 14px',
                fontSize: 13,
                color: 'rgba(255,255,255,0.78)',
                marginBottom: 18,
              }}
            >
              {t('footer.letsConnect')}
            </span>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 5.5vw, 72px)',
                color: 'var(--text-primary)',
                lineHeight: 1.02,
                marginBottom: 24,
              }}
            >
              {t('footer.growTogether')}{' '}
              <span style={{ color: 'var(--text-muted)' }}>{t('footer.together')}</span>
            </h2>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
              <Link to="/projects" className="btn-outline">
                {t('footer.seeAllProjects')}
              </Link>
              <a href={designer.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('footer.bookACall')}
              </a>
            </div>
          </div>

          <div
            style={{
              minHeight: 360,
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'linear-gradient(150deg, #070707 0%, #131313 58%, #0d0d0d 100%)',
              boxShadow: '0 16px 50px rgba(0,0,0,0.45)',
            }}
          >
            <div
              style={{
                height: 42,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
              }}
            >
              <span>{t('nav.home')}</span>
              <span>Catalog</span>
              <span style={{ marginLeft: 'auto', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.86)' }}>
                DISTORTION
              </span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.36)', marginBottom: 10 }}>
                {t('footer.limited')}
              </div>
              <div
                style={{
                  fontSize: 'clamp(32px, 5vw, 44px)',
                  color: '#fff',
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  marginBottom: 14,
                }}
              >
                Build With Khadidja
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 16 }}>
                {[
                  {
                    label: t('footer.development'),
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ),
                  },
                  {
                    label: t('footer.responsive'),
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                      </svg>
                    ),
                  },
                  {
                    label: t('footer.database'),
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                      </svg>
                    ),
                  },
                  {
                    label: t('footer.cloud'),
                    icon: (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    title={item.label}
                    style={{
                      borderRadius: 6,
                      background: '#1a1a1a',
                      minHeight: 88,
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.82)',
                    }}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#343434',
                    color: '#fff',
                    fontSize: 11,
                    padding: '8px 18px',
                    borderRadius: 4,
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {t('footer.shopNow')}
                </span>
                <span
                  style={{
                    background: '#222',
                    color: '#9c9c9c',
                    fontSize: 11,
                    padding: '8px 18px',
                    borderRadius: 4,
                    letterSpacing: '0.08em',
                  }}
                >
                  {t('footer.checkCollections')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer" style={{ background: '#050505', padding: '80px 5% 18px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            {lang === 'fr' ? (
              <>
                <h2 style={{ ...headlineStyle, color: '#fff' }}>{t('footer.lets')}</h2>
                <h2 style={{ ...headlineStyle, color: 'var(--text-muted)' }}>{t('footer.frSite')}</h2>
                <h2 style={{ ...headlineStyle, color: '#fff' }}>
                  <span style={animatedWordStyle}>{currentWord}</span>
                </h2>
                <h2 style={{ ...headlineStyle, color: 'var(--text-muted)' }}>{t('footer.frTogether')}</h2>
              </>
            ) : (
              <>
                <h2 style={{ ...headlineStyle, color: '#fff' }}>
                  {t('footer.lets')}{' '}
                  <span style={animatedWordStyle}>{currentWord}</span>
                </h2>
                <h2 style={{ ...headlineStyle, color: 'var(--text-muted)' }}>{t('footer.incredible')}</h2>
              </>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>{t('footer.email')}</p>
              <p style={{ color: '#fff' }}>{designer.email}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>{t('footer.callMe')}</p>
              <a href={designer.calendlyUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                {t('footer.bookNow')}
              </a>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>{t('footer.social')}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <FooterSocialIcon href={designer.socials.instagram} label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </FooterSocialIcon>
                <FooterSocialIcon href={designer.socials.linkedin} label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </FooterSocialIcon>
                <FooterSocialIcon href="https://github.com/hassanikhadidja" label="GitHub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.82c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.59 17.52 2 12 2z" />
                  </svg>
                </FooterSocialIcon>
                <FooterSocialIcon href={designer.cvUrl} label={t('common.downloadCv')} download>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                  </svg>
                </FooterSocialIcon>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginBottom: 28 }} />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 20,
            }}
          >
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>{t('footer.menu')}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(86px, 1fr))', columnGap: 24, rowGap: 6 }}>
                <Link to="/about" style={{ color: '#fff', textDecoration: 'none', fontSize: 14 }}>
                  {t('nav.about')}
                </Link>
                <Link to="/services" style={{ color: '#fff', textDecoration: 'none', fontSize: 14 }}>
                  {t('nav.services')}
                </Link>
                <Link to="/projects" style={{ color: '#fff', textDecoration: 'none', fontSize: 14 }}>
                  {t('nav.projects')}
                </Link>
                <Link to="/contact" style={{ color: '#fff', textDecoration: 'none', fontSize: 14 }}>
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 10,
                marginLeft: 'auto',
              }}
            >
              <LanguageToggle />
              <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
                © {year} {designer.name}
              </p>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
