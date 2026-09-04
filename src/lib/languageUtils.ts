export type SupportedLanguage =
  | 'en'
  | 'fr'
  | 'es'
  | 'it'
  | 'de'
  | 'nl'
  | 'no'
  | 'sv'
  | 'da'
  | 'fi'
  | 'pt';

export const supportedLanguages: { value: SupportedLanguage; label: string }[] =
  [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'it', label: 'Italiano' },
    { value: 'de', label: 'Deutsch' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'no', label: 'Norsk' },
    { value: 'sv', label: 'Svenska' },
    { value: 'da', label: 'Dansk' },
    { value: 'fi', label: 'Suomi' },
    { value: 'pt', label: 'Português' },
  ];

export const getLanguagePrefix = (language: string) => {
  if (language === 'en') return '';
  return `/${language}`;
};
