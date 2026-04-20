import { ref, reactive, computed } from 'vue';
import { translations } from './translations';

const STORAGE_KEY = 'portfolio_locale';
const DEFAULT_LOCALE = 'pt-br';

// Initialize locale from localStorage or default
const savedLocale = localStorage.getItem(STORAGE_KEY);
const currentLocale = ref(savedLocale && translations[savedLocale] ? savedLocale : DEFAULT_LOCALE);

export const useI18n = () => {
  const setLocale = (newLocale) => {
    if (translations[newLocale]) {
      currentLocale.value = newLocale;
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  };

  const t = (key) => {
    const localeTranslations = translations[currentLocale.value] || translations[DEFAULT_LOCALE];
    return localeTranslations[key] || key;
  };

  const locale = computed(() => currentLocale.value);

  return {
    locale,
    setLocale,
    t
  };
};
