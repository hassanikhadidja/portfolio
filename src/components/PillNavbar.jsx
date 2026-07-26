import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { designer } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import AnimatedText from './AnimatedText';
import './HeroKhadidja.css';

function PillNavBrand({ className = '' }) {
  return (
    <Link to="/" className={className} aria-label="Home">
      <AnimatedText text={designer.navBrandText} delay={0.06} className="pill-nav-brand-animated" />
    </Link>
  );
}

function PillNavToolbar() {
  const { t } = useLanguage();
  const cal = designer.calendlyUrl;
  return (
    <nav className="tr-animate-nav pill-nav-inner" aria-label="Main navigation">
      <div className="tr-navbar">
        <PillNavBrand className="tr-logo pill-nav-logo-desktop pill-nav-brand-link" />
        <ul className="tr-nav-links">
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {t('nav.about')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {t('nav.projects')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {t('nav.services')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {t('nav.contact')}
            </NavLink>
          </li>
        </ul>
        <a href={cal} target="_blank" rel="noopener noreferrer" className="btn-book-nav" aria-label={t('nav.bookCall')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="btn-book-nav-label">{t('nav.bookCall')}</span>
        </a>
      </div>
    </nav>
  );
}

/** Laptop/desktop pill, tablet top bar + drawer, phone bottom pill — see HeroKhadidja.css breakpoints. */
export default function PillNavbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);

  useEffect(() => {
    setTabletMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!tabletMenuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setTabletMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [tabletMenuOpen]);

  return (
    <>
      {/* Phone (≤499px): corner logo + soft frosted top scrim while scrolling */}
      <div className="pill-nav-mobile-top-wrap">
        <div className="pill-nav-mobile-scrim" aria-hidden />
        <PillNavBrand className="pill-nav-mobile-logo pill-nav-brand-link" />
      </div>

      {/* Laptop (≥801px): pill top */}
      <header className="pill-nav-root pill-nav-desktop">
        <PillNavToolbar />
      </header>

      {/* Tablet (500–800px): dark top bar + side drawer */}
      <div className="pill-nav-tablet-wrap">
        <header className="pill-nav-tablet-bar">
          <div className="pill-nav-tablet-inner">
            <PillNavBrand className="pill-nav-tablet-logo pill-nav-brand-link" />
            <button
              type="button"
              className="pill-nav-tablet-toggle"
              aria-label={tabletMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={tabletMenuOpen}
              aria-controls="pill-nav-tablet-drawer"
              onClick={() => setTabletMenuOpen((o) => !o)}
            >
              <span className="pill-nav-tablet-lines" aria-hidden>
                <span className="pill-nav-tablet-line" />
                <span className="pill-nav-tablet-line" />
              </span>
            </button>
          </div>
        </header>

        <div
          className={`pill-nav-tablet-backdrop ${tabletMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!tabletMenuOpen}
          onClick={() => setTabletMenuOpen(false)}
        />

        <aside
          id="pill-nav-tablet-drawer"
          className={`pill-nav-tablet-drawer ${tabletMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!tabletMenuOpen}
        >
          <div className="pill-nav-tablet-drawer-head">
            <span className="pill-nav-tablet-drawer-title">{t('nav.menu')}</span>
            <button type="button" className="pill-nav-tablet-drawer-close" aria-label={t('nav.closeMenu')} onClick={() => setTabletMenuOpen(false)}>
              ×
            </button>
          </div>
          <nav className="pill-nav-tablet-drawer-nav" aria-label="Main navigation">
            <NavLink to="/about" className={({ isActive }) => `pill-nav-tablet-link ${isActive ? 'active' : ''}`} onClick={() => setTabletMenuOpen(false)}>
              {t('nav.about')}
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => `pill-nav-tablet-link ${isActive ? 'active' : ''}`} onClick={() => setTabletMenuOpen(false)}>
              {t('nav.projects')}
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `pill-nav-tablet-link ${isActive ? 'active' : ''}`} onClick={() => setTabletMenuOpen(false)}>
              {t('nav.services')}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `pill-nav-tablet-link ${isActive ? 'active' : ''}`} onClick={() => setTabletMenuOpen(false)}>
              {t('nav.contact')}
            </NavLink>
          </nav>
          <a href={designer.calendlyUrl} target="_blank" rel="noopener noreferrer" className="pill-nav-tablet-cta" onClick={() => setTabletMenuOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {t('nav.bookCall')}
          </a>
        </aside>
      </div>

      {/* Phone (≤499px): bottom pill */}
      <header className="pill-nav-root pill-nav-mobile-bottom">
        <PillNavToolbar />
      </header>
    </>
  );
}
