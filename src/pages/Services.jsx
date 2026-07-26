import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { useLocalizedContent } from '../i18n/useLocalizedContent';
import './ProjectsHero.css';
import './ServicesHero.css';

export default function Services() {
  const { services, process, faqs, t } = useLocalizedContent();
  const [openFaq, setOpenFaq] = useState(null);
  const [currencyId, setCurrencyId] = useState('dzd');

  const CURRENCIES = useMemo(
    () => [
      { id: 'dzd', label: t('servicesPage.dzd'), symbol: 'دج' },
      { id: 'eur', label: t('servicesPage.eur'), symbol: '€' },
      { id: 'usd', label: t('servicesPage.usd'), symbol: '$' },
    ],
    [t]
  );

  return (
    <PageTransition>
      {/* Hero */}
      <section className="servicesHero" aria-label="Services">
        <div className="servicesHero-inner">
          <div className="projectsHero-badge">
            <svg className="projectsHero-badgeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="5" fill="#ccc" />
            </svg>
            {t('servicesPage.ourServices')}
          </div>
          <h1 className="servicesHero-title">
            {t('servicesPage.headlineLine1')}
            <br />
            {t('servicesPage.headlineLine2')}
          </h1>
        </div>
      </section>

      {/* Services List */}
      <section style={{ padding: '56px 5% 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(36px, 4.5vw, 52px)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  marginBottom: 18,
                  lineHeight: 1.15,
                }}
              >
                {t('servicesPage.whatIOffer')}
              </h2>
              <p
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: 16,
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                }}
              >
                {t('servicesPage.offerLead')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div
              style={{
                padding: '28px 32px',
                borderRadius: 28,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <span className="section-label block mb-2">{t('servicesPage.currency')}</span>
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(24px, 2.5vw, 32px)',
                  fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  marginBottom: 8,
                }}
              >
                {t('servicesPage.chooseCurrency')}
              </h2>
              <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
                {t('servicesPage.pricesUpdate')}
              </p>
              <div
                role="group"
                aria-label={t('servicesPage.selectCurrency')}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
              >
                {CURRENCIES.map((c) => {
                  const active = c.id === currencyId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCurrencyId(c.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '12px 18px',
                        borderRadius: 14,
                        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                        background: active ? 'rgba(245,230,200,0.08)' : 'var(--surface-2)',
                        color: active ? 'var(--accent)' : 'var(--text-muted)',
                        fontFamily: 'DM Sans',
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 18,
                          fontStyle: 'italic',
                          minWidth: 28,
                        }}
                      >
                        {c.symbol}
                      </span>
                      <span style={{ color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {c.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <div className="servicesOffer-grid">
            {services.map((service) => {
              const price = service.prices?.[currencyId];
              const tags = service.tags || service.platforms || [];
              return (
                <ScrollReveal key={service.id} delay={0.05}>
                  <div className="servicesOffer-card">
                    <div
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: 12,
                        letterSpacing: '0.08em',
                        color: 'var(--text-muted)',
                        marginBottom: 8,
                      }}
                    >
                      {service.number}
                    </div>
                    <h2
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(22px, 2.2vw, 28px)',
                        color: 'var(--text-primary)',
                        marginBottom: 10,
                        lineHeight: 1.2,
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'DM Sans',
                        fontSize: 14,
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        marginBottom: 20,
                      }}
                    >
                      {service.details}
                    </p>

                    {price && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 14px',
                          borderRadius: 12,
                          border: '1px solid var(--border)',
                          marginBottom: 20,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: 11,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {price.label}
                        </span>
                        <span
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 'clamp(16px, 1.6vw, 20px)',
                            fontStyle: 'italic',
                            color: 'var(--accent)',
                            textAlign: 'right',
                          }}
                        >
                          {price.display}
                        </span>
                      </div>
                    )}

                    {service.addOns?.length > 0 && (
                      <div style={{ marginBottom: 20, flex: 1 }}>
                        <div
                          style={{
                            fontFamily: 'DM Sans',
                            fontSize: 11,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            marginBottom: 12,
                          }}
                        >
                          {t('servicesPage.addOns')}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {service.addOns.map((addOn) => (
                            <div
                              key={addOn.name}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                gap: 12,
                                flexWrap: 'wrap',
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'DM Sans',
                                  fontSize: 13,
                                  color: 'var(--text-primary)',
                                }}
                              >
                                {addOn.name}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'Playfair Display, serif',
                                  fontSize: 14,
                                  fontStyle: 'italic',
                                  color: 'var(--accent)',
                                  textAlign: 'right',
                                }}
                              >
                                {addOn.prices[currencyId]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2" style={{ marginTop: 'auto' }}>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 10,
                            background: 'var(--surface-2)',
                            border: '1px solid var(--border)',
                            fontFamily: 'DM Sans',
                            fontSize: 12,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '48px 5%', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="section-label block mb-3">{t('servicesPage.howWeWork')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontStyle: 'italic', color: 'var(--text-primary)' }}>{t('servicesPage.theProcess')}</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
            {process.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{ textAlign: 'center', padding: '18px 14px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '32px', fontStyle: 'italic', color: 'rgba(245,230,200,0.12)', marginBottom: 6, lineHeight: 1 }}>{step.step}</div>
                  <h3 style={{ fontFamily: 'DM Sans', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontFamily: 'DM Sans', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.55 }}>{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '48px 5% 56px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ marginBottom: 28 }}>
              <span className="section-label block mb-3">{t('servicesPage.faq')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 3.5vw, 48px)', fontStyle: 'italic', color: 'var(--text-primary)' }}>{t('servicesPage.commonQuestions')}</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div
                  style={{ borderRadius: 16, background: 'var(--surface-2)', border: '1px solid var(--border)', overflow: 'hidden' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', textAlign: 'left', cursor: 'none' }}
                  >
                    <span style={{ fontFamily: 'DM Sans', fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      style={{ color: 'var(--accent)', fontSize: '20px', flexShrink: 0, marginLeft: 16 }}
                    >+</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ padding: '0 24px 20px', fontFamily: 'DM Sans', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
