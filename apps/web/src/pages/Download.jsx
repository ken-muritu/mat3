import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Download, 
  Smartphone, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Apple,
  ExternalLink
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { appDownloads } from '../config/appDownloads'

const features = [
  { icon: Zap, text: 'Fast & lightweight app' },
  { icon: Shield, text: 'Secure payments via M-Pesa' },
  { icon: CheckCircle, text: 'Real-time matatu tracking' },
]

export default function DownloadPage() {
  const { isDark } = useTheme()
  const [downloading, setDownloading] = useState(null)

  const handleDownload = (platform) => {
    setDownloading(platform)
    setTimeout(() => setDownloading(null), 3000)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Smartphone className="w-5 h-5 text-accent" />
              <span className="text-white/90 font-medium">Available for Android & iOS</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Download the Ma3 App
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get the Ma3 app on your phone and enjoy seamless matatu travel across Kenya. 
              Book rides, pay cashless, and track your matatu in real-time.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  <feature.icon className="w-4 h-4 text-accent" />
                  <span className="text-white/90 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Cards Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            
            {/* Android Card */}
            <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 2.146a.5.5 0 00-.866.001l-1.573 2.725a8.943 8.943 0 00-6.168 0L7.343 2.147a.5.5 0 00-.866-.001.5.5 0 00-.047.5l1.39 2.405A8.963 8.963 0 004 12.5V21a1 1 0 001 1h14a1 1 0 001-1v-8.5a8.963 8.963 0 00-3.82-7.449l1.39-2.405a.5.5 0 00-.047-.5zM8.5 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Android
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Version 1.0.0 • 25 MB
                  </p>
                </div>
              </div>

              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Download the APK directly to your Android device. No Google Play account required.
              </p>

              {appDownloads.android.available ? (
                <a
                  href={appDownloads.android.url}
                  download="Ma3-v1.0.0.apk"
                  onClick={() => handleDownload('android')}
                  className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all"
                >
                  {downloading === 'android' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download APK
                    </>
                  )}
                </a>
              ) : (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-3 bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    APK Coming Soon
                  </button>
                  <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    We're preparing the Android app. Check back soon!
                  </p>
                </div>
              )}

              {appDownloads.android.available && (
                <p className={`mt-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="font-medium">Note:</span> You may need to enable "Install from unknown sources" in your device settings.
                </p>
              )}
            </div>

            {/* iOS Card */}
            <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-500/10 rounded-2xl flex items-center justify-center">
                  <Apple className="w-10 h-10 text-gray-700 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    iOS
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    iPhone & iPad
                  </p>
                </div>
              </div>

              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Download from the App Store for the best experience on your Apple device.
              </p>

              {appDownloads.ios.available ? (
                <a
                  href={appDownloads.ios.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all"
                >
                  <Apple className="w-5 h-5" />
                  Download on App Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-3 bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
                  >
                    <Apple className="w-5 h-5" />
                    Coming to App Store
                  </button>
                  <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    iOS version is under development. Stay tuned!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How to Install
            </h2>

            <div className="space-y-6">
              {/* Android Instructions */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
                  Android Installation
                </h3>
                <ol className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                    <span>Download the APK file by clicking the download button above</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                    <span>Open Settings → Security → Enable "Unknown sources" or "Install unknown apps"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                    <span>Open the downloaded APK file and tap "Install"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                    <span>Once installed, open Ma3 and create your account!</span>
                  </li>
                </ol>
              </div>

              {/* iOS Instructions */}
              <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    <Apple className="w-4 h-4" />
                  </span>
                  iOS Installation
                </h3>
                <ol className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                    <span>Click the App Store button above to open the store</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                    <span>Tap "Get" to download the app</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                    <span>Authenticate with Face ID, Touch ID, or your Apple ID password</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                    <span>Open Ma3 and start your journey!</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Questions about the app?
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Check our help center or contact support for assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/help"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all"
              >
                Help Center
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-full transition-all border ${
                  isDark 
                    ? 'border-gray-700 text-white hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
