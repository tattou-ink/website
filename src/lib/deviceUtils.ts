import { createClientOnlyFn } from '@tanstack/react-start';

// Taken from https://stackoverflow.com/a/21742107/9517183
export const getDeviceOperatingSystem = createClientOnlyFn(() => {
  const userAgent =
    navigator.userAgent ||
    navigator.vendor ||
    // @ts-ignore - Let's ignore TS.
    window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (
    /iPad|iPhone|iPod/.test(userAgent) &&
    // @ts-ignore - Let's ignore TS.
    !window.MSStream
  ) {
    return 'iOS';
  }

  return 'unknown';
});
