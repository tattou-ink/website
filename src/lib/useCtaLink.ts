import { useCallback } from 'react';
import { getDeviceOperatingSystem } from './deviceUtils';
import { getLocale } from '@/paraglide/runtime';

const useCtaLink = () => {
  const getCtaHref = useCallback(() => {
    const operatingSystem = getDeviceOperatingSystem();
    if (operatingSystem === 'Android') {
      return 'https://pro.tattou.ink';
    }
    if (operatingSystem === 'iOS') {
      return 'https://apps.apple.com/app/id6775984413?mt=8';
    }
    return 'https://pro.tattou.ink';
  }, []);
  return { getCtaHref };
};

export const getAndroidMailLink = () => {
  const locale = getLocale();
  if (locale === 'fr') {
    return "mailto:contact@tattou.ink?subject=Je%20souhaite%20utiliser%20tattou.ink%20sur%20mon%20appareil%20Android&body=Bonjour%20l'%C3%A9quipe%20tattou.ink%2C%0A%0AJe%20voudrais%20utiliser%20tattou.ink%20sur%20mon%20appareil%20Android.";
  }
  return 'mailto:contact@tattou.ink?subject=I%20want%20to%20try%20tattou.ink%20on%20my%20Android%20device&body=Hi%20tattou.ink%20team%2C%0A%0AI%20would%20like%20to%20use%20tattou.ink%20on%20my%20Android%20device.';
};

export default useCtaLink;
