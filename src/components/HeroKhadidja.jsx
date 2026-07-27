import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { designer } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import { heroVideoPoster, heroVideoSources } from '../utils/media';
import './HeroKhadidja.css';

/** Home hero layout */
export default function HeroKhadidja() {
  const { t } = useLanguage();
  const quote1 = t('hero.quote1').split('\n');
  const quote2 = t('hero.quote2').split('\n');
  const sources = useMemo(() => heroVideoSources(designer.heroVideoSrc), []);
  const poster = useMemo(() => heroVideoPoster(designer.heroVideoSrc), []);
  const [videoSrc, setVideoSrc] = useState(sources.desktop);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 800px)');
    const apply = () => setVideoSrc(mq.matches ? sources.mobile : sources.desktop);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [sources]);

  return (
    <section className="hero-khadidja" aria-label="Introduction">
      <div className="tr-hero-video-wrap tr-animate-hero-media" aria-hidden>
        <video
          key={videoSrc}
          className="tr-hero-video"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="tr-hero-video-overlay" />
      </div>

      <div style={{ position: 'relative', zIndex: 5, maxWidth: 700 }}>
        <div className="tr-animate-badge" style={{ marginBottom: 18 }}>
          <span className="tr-badge">
            <span className="tr-badge-dot" />
            {t('hero.badge')}
          </span>
        </div>

        <div className="tr-animate-h1 tr-hero-heading-row">
          <h1 className="tr-hero-heading">{designer.name}</h1>
          <Link to="/about" className="tr-arrow-hover-zone" aria-label={t('hero.aboutMeAria')}>
            <span className="tr-arrow-line" aria-hidden />
            <span className="tr-arrow-col">
              <span className="tr-arrow-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h11M14 7l5 5-5 5" />
                </svg>
              </span>
              <span className="tr-arrow-hint">{t('hero.aboutMe')}</span>
            </span>
          </Link>
        </div>

        <p
          className="tr-animate-sub"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 520,
            marginBottom: 28,
            fontWeight: 300,
          }}
        >
          {t('hero.bio')}
        </p>

        <div className="tr-animate-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link to="/projects" className="btn-projects">
            {t('common.seeAllProjects')}
          </Link>
          <a href={designer.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-call">
            {t('common.bookACall')}
          </a>
        </div>
      </div>

      <div className="tr-card tr-card-1 tr-animate-card1">
        <p>
          {quote1[0]}
          <br />
          {quote1[1]}
        </p>
        <span className="tr-author">- AJBLOKS SEO</span>
      </div>

      <div className="tr-float-cursor" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3l14 9-7 1-4 7-3-17z" />
        </svg>
      </div>

      <div className="tr-float-arrow" aria-hidden>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>

      <div className="tr-card tr-card-2 tr-animate-card2">
        <p>
          {quote2[0]}
          <br />
          {quote2[1]}
        </p>
        <span className="tr-author">- Racélia bags</span>
      </div>
    </section>
  );
}
