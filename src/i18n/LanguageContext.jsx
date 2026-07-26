import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTranslation } from './translations';

const STORAGE_KEY = 'portfolio-lang';
const LanguageContext = createContext(null);

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr') return stored;
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((next) => {
    if (next !== 'en' && next !== 'fr') return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key) => getTranslation(lang, key), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
