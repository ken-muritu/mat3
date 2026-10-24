import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Phone, 
  MapPin, 
  Users, 
  AlertTriangle,
  Eye,
  Share2,
  CheckCircle,
  Star,
  Clock,
  ChevronRight
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const safetyFeatures = [
  {
    icon: AlertTriangle,
    title: 'SOS Emergency Button',
    description: 'One-tap emergency alert that notifies your contacts and our safety team with your live location.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Share2,
    title: 'Trip Sharing',
    description: 'Share your trip details and live location with family and friends for peace of mind.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Eye,
    title: 'Real-Time Tracking',
    description: 'Track your matatu in real-time throughout your journey with GPS precision.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Users,
    title: 'Verified Drivers',
    description: 'All drivers undergo background checks and are verified by their SACCOs.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Star,
    title: 'Rating System',
    description: 'Rate your trips and drivers. Low-rated drivers are reviewed and suspended if necessary.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'Every trip includes passenger insurance coverage up to KSh 5 million.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
]

const emergencyContacts = [
  { name: 'Police Emergency', number: '999', description: 'Kenya Police Service' },
  { name: 'Ambulance', number: '114', description: 'Emergency Medical Services' },
  { name: 'NTSA Hotline', number: '0800 723 323', description: 'Report traffic violations' },
  { name: 'Ma3 Support', number: '+254 700 MA3 APP', description: '24/7 customer support' },
]

const safetyTips = [
  'Always verify the vehicle registration matches your booking',
  'Share your trip with a trusted contact before boarding',
  'Sit near the door when possible for easy exit',
  'Keep your valuables secure and out of sight',
  'Trust your instincts - if something feels wrong, don\'t board',
  'Report any safety concerns immediately through the app',
]

export default function Safety() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen ${isDark ? 'bg-surface-dark' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Safety is Our Priority
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Ma3 is built with safety at its core. From verified drivers to real-time tracking, 
            we've implemented multiple layers of protection for every journey.
          </p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Safety Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all hover:shadow-lg ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className={isDark ? 'text-muted-dark' : 'text-muted'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className={`py-16 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
            <p className={isDark ? 'text-muted-dark' : 'text-muted'}>
              Save these numbers for quick access in case of emergency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center ${
                  isDark ? 'bg-surface-dark border border-white/10' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mb-4">
                  <Phone className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-semibold mb-1">{contact.name}</h3>
                <p className="text-xl font-bold text-primary mb-2">{contact.number}</p>
                <p className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                  {contact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Safety Tips for Passengers</h2>
          
          <div className="space-y-4">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-xl ${
                  isDark ? 'bg-white/5' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className={isDark ? 'text-text-dark' : 'text-text'}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-gradient rounded-3xl p-8 md:p-12 text-center">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              You're Protected on Every Trip
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Every journey with Ma3 includes comprehensive passenger insurance 
              coverage up to KSh 5 million, giving you peace of mind on the road.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold px-8 py-4 rounded-full transition-all"
            >
              Book a Safe Ride
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Report Section */}
      <section className={`py-16 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Report a Safety Concern</h2>
          <p className={`mb-8 ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
            If you've experienced or witnessed any safety issues during your trip, 
            please report it immediately. All reports are taken seriously and investigated.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-full transition-all">
            Report an Issue
          </button>
        </div>
      </section>
    </div>
  )
}
