import i18next from 'i18next';

import en_common from "./public/static/locales/en/common";
import fa_common from "./public/static/locales/fa/common";


i18next.init({
  interpolation: {escapeValue: false},
  lng: 'fa',
  defaultLanguage: 'fa',
  otherLanguages: ['fa'],
  localeSubpaths: {
    en: 'en',
    fa: 'fa',
  },
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      common: en_common,
    },
    fa: {
      common: fa_common,
    },
  },
});
export default i18next;


