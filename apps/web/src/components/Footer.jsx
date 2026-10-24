import { Link } from 'react-router-dom'
import { Bus, MapPin, Download } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { appDownloads } from '../config/appDownloads'

const footerLinks = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press', path: '/press' },
    { name: 'Blog', path: '/blog' },
  ],
  passengers: [
    { name: 'Book a Ride', path: '/book' },
    { name: 'View Routes', path: '/routes' },
    { name: 'Safety', path: '/safety' },
    { name: 'Help Center', path: '/help' },
  ],
  partners: [
    { name: 'Become a Partner SACCO', path: '/partners' },
    { name: 'Driver App', path: '/driver' },
    { name: 'SACCO Dashboard', path: '/sacco' },
    { name: 'API Documentation', path: '/api' },
  ],
  legal: [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' },
  ],
}


export default function Footer() {
  const { isDark } = useTheme()

  return (
    <footer className={`transition-colors duration-300 ${
      isDark ? 'bg-surface-dark border-t border-white/10' : 'bg-gray-50 border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight">
                  <span className="text-primary">Ma</span>
                  <span className="text-accent">3</span>
                </span>
                <span className="text-xs text-muted">Panda. Lipa. Fika.</span>
              </div>
            </Link>
            <p className={`mb-6 max-w-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              Revolutionizing Kenya's matatu sector through technology. Book rides, track matatus in real-time, and pay cashlessly.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className={`flex items-center gap-2 ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Links */}
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`${isDark ? 'text-muted-dark hover:text-accent' : 'text-muted hover:text-primary'} transition-colors`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Passengers</h3>
            <ul className="space-y-3">
              {footerLinks.passengers.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`${isDark ? 'text-muted-dark hover:text-accent' : 'text-muted hover:text-primary'} transition-colors`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Partners</h3>
            <ul className="space-y-3">
              {footerLinks.partners.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`${isDark ? 'text-muted-dark hover:text-accent' : 'text-muted hover:text-primary'} transition-colors`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        <div className={`py-8 border-t border-b ${isDark ? 'border-white/10' : 'border-gray-200'} mb-8`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Download the App</h3>
              <p className={`${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                Get the full experience on your mobile device
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href={appDownloads.ios.url || '#'}
                download={appDownloads.ios.available}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${!appDownloads.ios.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => !appDownloads.ios.available && e.preventDefault()}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-75">{appDownloads.ios.available ? 'Download for' : 'Coming soon'}</div>
                  <div className="font-semibold">iOS</div>
                </div>
              </a>
              <a
                href={appDownloads.android.url || '#'}
                download={appDownloads.android.available}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${!appDownloads.android.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => !appDownloads.android.available && e.preventDefault()}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-75">{appDownloads.android.available ? 'Download for' : 'Coming soon'}</div>
                  <div className="font-semibold">Android</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
            © {new Date().getFullYear()} Ma3. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm ${isDark ? 'text-muted-dark hover:text-accent' : 'text-muted hover:text-primary'} transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
