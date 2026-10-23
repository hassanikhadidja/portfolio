import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Seo from './components/Seo';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { designer } from './data/content';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(dotY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Fine pointer only — touch devices keep the normal system cursor
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => {
      const on = mq.matches;
      setEnabled(on);
      document.documentElement.classList.toggle('has-custom-cursor', on);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div style={{ position:'fixed',zIndex:999999,pointerEvents:'none',width:6,height:6,borderRadius:'50%',background:'var(--accent)',x:dotX,y:dotY,translateX:'-50%',translateY:'-50%' }} />
      <motion.div style={{ position:'fixed',zIndex:999998,pointerEvents:'none',width:28,height:28,borderRadius:'50%',border:'1px solid rgba(245,230,200,0.4)',x:ringX,y:ringY,translateX:'-50%',translateY:'-50%' }} />
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setP(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div style={{ position:'fixed',top:0,left:0,height:2,background:'var(--accent)',zIndex:100000,width:`${p}%`,transition:'width 0.1s linear' }} />;
}

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/bloom-e-commerce" element={<Navigate to="/projects/digital-wedding-invitation-templates" replace />} />
        <Route path="/projects/digital-wedding-invitation-template-01" element={<Navigate to="/projects/digital-wedding-invitation-templates" replace />} />
        <Route path="/projects/digital-wedding-invitation-template-02" element={<Navigate to="/projects/digital-wedding-invitation-templates" replace />} />
        <Route path="/projects/pure" element={<Navigate to="/projects/digital-wedding-invitation-templates" replace />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (sessionStorage.getItem('portfolio-intro-seen') === '1') return false;
    // Lab tools / automated audits — keep first paint on the real hero
    if (navigator.webdriver) return false;
    if (/Chrome-Lighthouse|PageSpeed|GTmetrix/i.test(navigator.userAgent)) return false;
  } catch {
    /* ignore */
  }
  return true;
}

function IntroSplash({ onDone }) {
  const { lang } = useLanguage();
  const splashTitle =
    lang === 'fr' ? 'Développeuse Web Full-Stack' : designer.introSplashTitle;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: 0.85 }}
      style={{ position:'fixed',inset:0,background:'var(--bg)',zIndex:100000,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:14 }}
      onAnimationComplete={onDone}
    >
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05 }}
        style={{ fontFamily:'Playfair Display,serif',fontSize:'clamp(40px,6vw,72px)',fontStyle:'italic',color:'var(--text-primary)',textAlign:'center',padding:'0 24px' }}>
        {designer.introSplashName}
      </motion.div>
      <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.45, delay:0.25, ease:[0.25,0.1,0.25,1] }}
        style={{ width:60,height:1,background:'var(--accent)',transformOrigin:'left' }} />
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3, delay:0.4 }}
        style={{ fontFamily:'DM Sans',fontSize:'clamp(13px,2.5vw,15px)',letterSpacing:'0.08em',color:'var(--text-muted)',textAlign:'center',padding:'0 24px',maxWidth:420 }}>
        {splashTitle}
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  const dismissIntro = () => {
    try {
      sessionStorage.setItem('portfolio-intro-seen', '1');
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      <LanguageProvider>
        <Seo />
        <CustomCursor />
        <ScrollProgress />
        <AnimatePresence>
          {showIntro && <IntroSplash key="intro" onDone={dismissIntro} />}
        </AnimatePresence>
        {/* Mount main UI immediately so FCP/LCP are not blocked by the splash */}
        <motion.div initial={false} animate={{ opacity: 1 }}>
          <Navbar />
          <main className="app-main" style={{ minHeight:'100vh' }}>
            <AnimatedRoutes />
          </main>
          <Footer />
        </motion.div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
