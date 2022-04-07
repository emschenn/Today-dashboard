import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "../locales/en";
import translationZh from "../locales/zh";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    zh: { translation: translationZh },
  },
  lng: "zh",
  fallbackLng: "zh",
  interpolation: { escapeValue: false },
});

export { i18n };
