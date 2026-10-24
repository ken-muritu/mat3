import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (section: string, key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_KEY = 'ma3_language';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved === 'en' || saved === 'sw') {
        setLanguageState(saved);
      }
    } catch (error) {
      console.log('Failed to load language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.log('Failed to save language:', error);
    }
  };

  const t = (section: string, key: string): string => {
    const langTranslations = translations[language] as Record<string, Record<string, string>>;
    const sectionTranslations = langTranslations[section];
    if (sectionTranslations && sectionTranslations[key]) {
      return sectionTranslations[key];
    }
    // Fallback to English
    const enTranslations = translations.en as Record<string, Record<string, string>>;
    const enSection = enTranslations[section];
    if (enSection && enSection[key]) {
      return enSection[key];
    }
    return key;
  };

  return React.createElement(
    I18nContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export { translations };
export type { Language };
