import ScrollReveal from './ScrollReveal';
import { designer } from '../data/content';
import { useLocalizedContent } from '../i18n/useLocalizedContent';
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
      className="aboutHero-social"
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
      <div className="aboutHero-inner">
        <ScrollReveal>
          <div className="aboutHero-intro">
            <div className="aboutHero-badgeWrap">
              <div className="projectsHero-badge" style={{ marginBottom: 0 }}>
                <svg className="projectsHero-badgeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="5" fill="#ccc" />
                </svg>
                {t('aboutHero.badge')}
              </div>
            </div>

            <h1 className="aboutHero-title">{designer.name}</h1>
            <p className="aboutHero-roleLine">{t('aboutHero.role')}</p>
            <p className="aboutHero-lead">{t('aboutHero.lead')}</p>

            <div className="aboutHero-toolbar">
              <div className="aboutHero-status">
                <span className="aboutHero-statusDot" />
                <span>{t('common.availableForWork')}</span>
              </div>
              <div className="aboutHero-actions">
                <AboutSocialIcon href="https://github.com/hassanikhadidja" label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.82c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.59 17.52 2 12 2z" />
                  </svg>
                </AboutSocialIcon>
                <a
                  href={designer.inquiryFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline aboutHero-cta"
                >
                  {t('common.projectInquiry')}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="aboutHero-body">
            <p className="aboutHero-bio">{d.bioLong}</p>

            <div className="aboutHero-skills">
              {(Array.isArray(aboutSkills) ? aboutSkills : []).map((s) => (
                <span key={s} className="aboutHero-skill">
                  {s}
                </span>
              ))}
            </div>

            <div className="aboutHero-projects">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="aboutHero-projectRow">
                  <span className="aboutHero-projectCat">{p.category}</span>
                  <span className="aboutHero-projectMeta">
                    <span className="aboutHero-projectTitle">{p.title}</span>
                    <span className="aboutHero-projectYear">{p.year}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
