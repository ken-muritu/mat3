export const appDownloads = {
  android: {
    url: import.meta.env.VITE_ANDROID_APK_URL || null,
    label: 'Android',
    storeLabel: 'Google Play',
    available: !!import.meta.env.VITE_ANDROID_APK_URL,
  },
  ios: {
    url: import.meta.env.VITE_IOS_APP_URL || null,
    label: 'iOS',
    storeLabel: 'App Store',
    available: !!import.meta.env.VITE_IOS_APP_URL,
  },
}

export const getAndroidDownloadUrl = () => appDownloads.android.url
export const getIosDownloadUrl = () => appDownloads.ios.url

export const isAndroidAvailable = () => appDownloads.android.available
export const isIosAvailable = () => appDownloads.ios.available
