import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhTranslation from './locales/zh.json';
import enTranslation from './locales/en.json';

i18n
  .use(LanguageDetector) // 自动检测浏览器语言
  .use(initReactI18next) // 初始化 react-i18next
  .init({
    resources: {
      zh: {
        translation: zhTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    lng: 'zh', // 默认语言为中文
    fallbackLng: 'en', // 如果检测不到语言，使用英文
    defaultNS: 'translation',
    debug: false,
    interpolation: {
      escapeValue: false, // React 已经转义了
    },
    detection: {
      // 语言检测配置
      order: ['localStorage', 'navigator'], // 优先从 localStorage 读取，然后从浏览器设置读取
      caches: ['localStorage'], // 将语言选择保存到 localStorage
      lookupLocalStorage: 'i18nextLng', // localStorage 的 key
    },
  });

export default i18n;

