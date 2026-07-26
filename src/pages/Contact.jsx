import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';
import { designer } from '../data/content';
import { useLocalizedContent } from '../i18n/useLocalizedContent';
import './ProjectsHero.css';
import './ServicesHero.css';
import './ContactPage.css';

function ScrollableSelect({ id, label, value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    const lockScroll = window.matchMedia('(max-width: 800px)').matches;
    if (lockScroll) document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('keydown', onKey);
      if (lockScroll) document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="contactSelect" ref={rootRef}>
      <label
        htmlFor={id}
        style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}
      >
        {label}
      </label>
      <button
        id={id}
        type="button"
        className={`contactSelect-trigger ${open ? 'is-open' : ''} ${selected ? '' : 'is-placeholder'}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg className="contactSelect-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <>
          <div className="contactSelect-backdrop" aria-hidden onClick={() => setOpen(false)} />
          <div className="contactSelect-menu" role="listbox" aria-label={label}>
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={opt.value === value}
                className={`contactSelect-option ${opt.value === value ? 'is-active' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Contact() {
  const { services, t } = useLocalizedContent();
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const PROJECT_TYPE_OPTIONS = useMemo(
    () => [
      ...services.map((s) => ({ value: s.title, label: s.title })),
      { value: 'Other', label: t('common.other') },
    ],
    [services, t]
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t('contact.nameRequired');
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = t('contact.emailInvalid');
    if (!form.message.trim()) e.message = t('contact.messageRequired');
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    if (!designer.contactFormUrl) {
      setSubmitError(t('contact.notConfigured'));
      return;
    }

    setErrors({});
    setSubmitError('');
    setSending(true);

    try {
      // Apps Script: form-encoded + no-cors is the reliable browser pattern.
      await fetch(designer.contactFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: form.name.trim(),
          email: form.email.trim(),
          type: form.type || t('contact.notSpecified'),
          message: form.message.trim(),
        }).toString(),
      });

      setSubmitted(true);
      setForm({ name: '', email: '', type: '', message: '' });
    } catch {
      setSubmitError(t('contact.sendError'));
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <div className="contactPage">
      {/* Hero */}
      <section className="servicesHero" aria-label="Contact">
        <div className="servicesHero-inner">
          <div className="projectsHero-badge">
            <svg className="projectsHero-badgeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="5" fill="#ccc" />
            </svg>
            {t('contact.label')}
          </div>
          <h1 className="servicesHero-title">
            {t('contact.titleLine1')}
            <br />
            {t('contact.titleLine2')}
          </h1>
        </div>
      </section>

      {/* Split layout */}
      <section className="contactPage-splitSection">
        <div className="contactPage-split">

          {/* Left: Info */}
          <ScrollReveal direction="left">
            <div className="contactPage-info">
              <span className="section-label block mb-4">{t('contact.getInTouch')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 2.8vw, 38px)', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 24, lineHeight: 1.2 }}>
                {t('contact.ready')}
              </h2>

              {/* Email */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{t('contact.email')}</div>
                <a href={`mailto:${designer.email}`} style={{ fontFamily: 'DM Sans', fontSize: '16px', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid rgba(245,230,200,0.3)', paddingBottom: 2 }}>
                  {designer.email}
                </a>
              </div>

              {/* Availability */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{t('contact.status')}</div>
                <span className="flex items-center gap-2 w-fit px-4 py-2 rounded-full" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <span className="pulse-anim inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#4ade80' }}>{t('common.availableForProjects')}</span>
                </span>
              </div>

              {/* Socials */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>{t('contact.followAlong')}</div>
                <div className="contactSocials">
                  {[
                    {
                      label: 'Instagram',
                      href: designer.socials.instagram,
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                      ),
                    },
                    {
                      label: 'LinkedIn',
                      href: designer.socials.linkedin,
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      ),
                    },
                    {
                      label: 'GitHub',
                      href: 'https://github.com/hassanikhadidja',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.82c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.24C22 6.59 17.52 2 12 2z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'CV',
                      href: designer.cvUrl,
                      download: designer.cvFileName,
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                        </svg>
                      ),
                    },
                  ].map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href || '#'}
                      download={s.download || undefined}
                      target={!s.download && s.href?.startsWith('http') ? '_blank' : undefined}
                      rel={!s.download && s.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={s.label === 'CV' ? t('common.downloadCv') : s.label}
                      whileHover={{ y: -2 }}
                      className="contactSocial"
                    >
                      <span className="contactSocial-icon">{s.icon}</span>
                      <span className="contactSocial-label">{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ padding: '60px 40px', borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}
                >
                  <div style={{ fontSize: '48px', marginBottom: 20 }}>✦</div>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '32px', fontStyle: 'italic', color: 'var(--accent)', marginBottom: 12 }}>{t('contact.successTitle')}</h3>
                  <p style={{ fontFamily: 'DM Sans', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {t('contact.successBody')}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="contactPage-form"
                  style={{ padding: '44px', borderRadius: 24, background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h3 style={{ fontFamily: 'DM Sans', fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 28 }}>{t('contact.sendMessage')}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {/* Name */}
                    <div>
                      <label style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>{t('contact.name')}</label>
                      <motion.div animate={errors.name ? { x: [-6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.3 }}>
                        <input className="form-input" placeholder={t('contact.namePlaceholder')} value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                        {errors.name && <span style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#f87171', marginTop: 4, display: 'block' }}>{errors.name}</span>}
                      </motion.div>
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>{t('contact.email')}</label>
                      <motion.div animate={errors.email ? { x: [-6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.3 }}>
                        <input className="form-input" placeholder={t('contact.emailPlaceholder')} value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        {errors.email && <span style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#f87171', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                      </motion.div>
                    </div>

                    {/* Project Type */}
                    <ScrollableSelect
                      id="project-type"
                      label={t('contact.projectType')}
                      placeholder={t('contact.typePlaceholder')}
                      value={form.type}
                      options={PROJECT_TYPE_OPTIONS}
                      onChange={(type) => setForm((f) => ({ ...f, type }))}
                    />

                    {/* Message */}
                    <div>
                      <label style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>{t('contact.message')}</label>
                      <motion.div animate={errors.message ? { x: [-6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.3 }}>
                        <textarea className="form-input" rows={5} placeholder={t('contact.messagePlaceholder')} value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          style={{ resize: 'vertical' }} />
                        {errors.message && <span style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#f87171', marginTop: 4, display: 'block' }}>{errors.message}</span>}
                      </motion.div>
                    </div>

                    {submitError && (
                      <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#f87171', margin: 0 }}>
                        {submitError}
                      </p>
                    )}

                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      className="btn-primary"
                      disabled={sending}
                      whileHover={sending ? undefined : { scale: 1.01 }}
                      whileTap={sending ? undefined : { scale: 0.98 }}
                      style={{
                        justifyContent: 'center',
                        marginTop: 4,
                        opacity: sending ? 0.7 : 1,
                        cursor: sending ? 'wait' : 'pointer',
                      }}
                    >
                      {sending ? t('contact.sending') : t('contact.sendCta')}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      {/* Calendly section */}
      <section className="contactPage-calendly" style={{ padding: '60px 5% 100px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="section-label block mb-3">{t('contact.schedule')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 12 }}>
                {t('contact.bookDiscovery')}
              </h2>
              <p style={{ fontFamily: 'DM Sans', fontSize: '15px', color: 'var(--text-muted)' }}>
                {t('contact.calendlyLead')}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div
              className="contactPage-calendlyCard"
              style={{
                borderRadius: 18,
                border: '1px solid var(--border)',
                overflow: 'hidden',
                background: 'var(--surface-2)',
                padding: '28px 24px',
                textAlign: 'center',
                maxWidth: 420,
                margin: '0 auto',
              }}
            >
              <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'var(--text-muted)', marginBottom: 18, lineHeight: 1.6 }}>
                {t('contact.calendlyBody')}
              </p>
              <a href={designer.calendlyUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"
                style={{ display: 'inline-flex' }}>
                {t('contact.bookCalendly')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
      </div>
    </PageTransition>
  );
}
