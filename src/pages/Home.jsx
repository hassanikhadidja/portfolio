import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import AboutHeroSection from '../components/AboutHeroSection';
import HeroKhadidja from '../components/HeroKhadidja';
import MarqueeStrip from '../components/MarqueeStrip';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import { useLocalizedContent } from '../i18n/useLocalizedContent';
import './ProjectsGrid.css';
import './HomePage.css';

export default function Home() {
  const { projects, services, process, features, marqueeItems, t } = useLocalizedContent();

  return (
    <PageTransition>
      <HeroKhadidja />

      {/* MARQUEE */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
        <MarqueeStrip items={marqueeItems} direction="left" />
        <MarqueeStrip items={[...marqueeItems].reverse()} direction="right" accent={false} />
      </section>

      {/* PROJECTS — under marquee */}
      <section className="homeProjects-section">
        <div className="homeProjects-inner">
          <div className="homeProjects-masonry">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} large />
            ))}
          </div>
        </div>
      </section>

      <AboutHeroSection padding="96px 5%" className="aboutHero-section--home" />

      {/* SERVICES PREVIEW */}
      <section className="homePage-services" style={{ padding: '80px 5% 120px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div className="homePage-servicesHead" style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="section-label block mb-3">{t('home.whatIDo')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontStyle: 'italic', color: 'var(--text-primary)' }}>{t('home.customWebDev')}</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="homePage-process" style={{ padding: '120px 5%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal>
            <div className="homePage-processHead" style={{ textAlign: 'center', marginBottom: 80 }}>
              <span className="section-label block mb-3">{t('home.howWeWork')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontStyle: 'italic', color: 'var(--text-primary)' }}>{t('home.processEverything')}</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="homePage-processStep"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: i % 2 === 0 ? '1fr auto' : 'auto 1fr',
                    gap: 40,
                    alignItems: 'start',
                    padding: '40px 0',
                    borderBottom: i < process.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {i % 2 !== 0 && (
                    <div
                      className="homePage-processNum"
                      style={{
                        fontFamily: 'Playfair Display',
                        fontSize: '80px',
                        fontStyle: 'italic',
                        color: 'rgba(245,230,200,0.06)',
                        fontWeight: 400,
                        lineHeight: 1,
                        textAlign: 'right',
                      }}
                    >
                      {step.step}
                    </div>
                  )}
                  <div style={i % 2 === 0 ? {} : { textAlign: 'right' }}>
                    <h3 style={{ fontFamily: 'DM Sans', fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>{step.title}</h3>
                    <p style={{ fontFamily: 'DM Sans', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>{step.description}</p>
                  </div>
                  {i % 2 === 0 && (
                    <div
                      className="homePage-processNum"
                      style={{
                        fontFamily: 'Playfair Display',
                        fontSize: '80px',
                        fontStyle: 'italic',
                        color: 'rgba(245,230,200,0.06)',
                        fontWeight: 400,
                        lineHeight: 1,
                      }}
                    >
                      {step.step}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ME */}
      <section className="homePage-why" style={{ padding: '120px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal>
            <div className="homePage-whyHead" style={{ textAlign: 'center', marginBottom: 60 }}>
              <span className="section-label block mb-3">{t('home.whyMe')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontStyle: 'italic', color: 'var(--text-primary)' }}>{t('home.setsApart')}</h2>
            </div>
          </ScrollReveal>
          <div className="homePage-whyGrid">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <motion.div
                  className={`homePage-whyCard ${i % 2 === 0 ? 'is-black' : 'is-grey'}`}
                  whileHover={{ y: -3, borderColor: 'rgba(245,230,200,0.15)' }}
                >
                  <h3 style={{ fontFamily: 'DM Sans', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55 }}>{f.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="homePage-cta" style={{ padding: '100px 5%', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(40px, 5vw, 68px)', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 20 }}>
              {t('home.ctaTitle')}
            </h2>
            <p style={{ fontFamily: 'DM Sans', fontSize: '16px', color: 'var(--text-muted)', marginBottom: 36 }}>
              {t('home.ctaLead')}
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">{t('common.startProject')}</Link>
              <Link to="/projects" className="btn-outline">{t('common.viewWork')}</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
