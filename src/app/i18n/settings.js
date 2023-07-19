export const fallbackLng = 'en';
export const languages = [fallbackLng, 'de', 'en', 'es', 'fr', 'pt', 'zh', 'ja', 'ko'];

export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}