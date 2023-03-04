import i18n from 'i18next'

import { initReactI18next } from "react-i18next";

import translationRU from "../locales/ru/translation.json";
import translationTM from "../locales/tm/trnaslation.json";
import translationEN from "../locales/en/translation.json";

const resources = {
    ru: {
      translation: translationRU,
    },
    en: {
      translation: translationEN,
    },
    tm: {
      translation: translationTM,
    },
}


i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') as string | 'en',
    fallbackLng: "en",
  
    interpolation: {
      escapeValue: false,
    },
});

export default i18n;