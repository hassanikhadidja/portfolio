import { useMemo } from 'react';
import {
  designer as designerEn,
  projects as projectsEn,
  services as servicesEn,
  process as processEn,
  features as featuresEn,
  faqs as faqsEn,
  marqueeItems as marqueeEn,
} from '../data/content';
import { useLanguage } from './LanguageContext';
import { frContent } from './frContent';

function mergeByIndex(base, overlay, mapItem) {
  if (!overlay) return base;
  return base.map((item, i) => mapItem(item, overlay[i] || {}));
}

export function useLocalizedContent() {
  const { lang, t } = useLanguage();

  return useMemo(() => {
    if (lang !== 'fr') {
      return {
        designer: designerEn,
        projects: projectsEn.map((p) => ({ ...p, categoryKey: p.category })),
        services: servicesEn,
        process: processEn,
        features: featuresEn,
        faqs: faqsEn,
        marqueeItems: marqueeEn,
        t,
        lang,
      };
    }

    const fr = frContent;

    return {
      designer: {
        ...designerEn,
        ...fr.designer,
      },
      projects: mergeByIndex(projectsEn, fr.projects, (item, o) => ({
        ...item,
        categoryKey: item.category,
        category: o.category ?? item.category,
        description: o.description ?? item.description,
      })),
      services: mergeByIndex(servicesEn, fr.services, (item, o) => ({
        ...item,
        title: o.title ?? item.title,
        description: o.description ?? item.description,
        details: o.details ?? o.description ?? item.details,
        platforms: o.platforms ?? item.platforms,
        tags: o.tags ?? o.platforms ?? item.tags,
        prices: {
          dzd: { ...item.prices.dzd, label: o.priceLabelDzd ?? item.prices.dzd.label },
          usd: item.prices.usd,
          eur: item.prices.eur,
        },
        addOns: (item.addOns || []).map((addOn, j) => ({
          ...addOn,
          name: o.addOns?.[j] ?? addOn.name,
        })),
      })),
      process: mergeByIndex(processEn, fr.process, (item, o) => ({
        ...item,
        title: o.title ?? item.title,
        description: o.description ?? item.description,
      })),
      features: mergeByIndex(featuresEn, fr.features, (item, o) => ({
        ...item,
        title: o.title ?? item.title,
        description: o.description ?? item.description,
      })),
      faqs: mergeByIndex(faqsEn, fr.faqs, (item, o) => ({
        q: o.q ?? item.q,
        a: o.a ?? item.a,
      })),
      marqueeItems: fr.marqueeItems || marqueeEn,
      t,
      lang,
    };
  }, [lang, t]);
}

export function localizeProjectDetail(detail, lang) {
  if (!detail || lang !== 'fr') return detail;
  const overlay = frContent.projectDetails?.[detail.slug];
  if (!overlay) return detail;
  return {
    ...detail,
    ...overlay,
  };
}
