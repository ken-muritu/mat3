import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Navigation, 
  Wallet, 
  Shield, 
  Clock, 
  Star, 
  Users, 
  Bus, 
  ArrowRight,
  CheckCircle,
  Smartphone,
  CreditCard,
  Map,
  Download
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const features = [
  {
    icon: Navigation,
    title: 'Real-Time Tracking',
    description: 'Track your matatu live on the map. Know exactly when it will arrive at your stage.',
  },
  {
    icon: Wallet,
    title: 'Cashless Payments',
    description: 'Pay with M-Pesa, Airtel Money, or your wallet. No more cash hassles.',
  },
  {
    icon: Clock,
    title: 'Advance Booking',
    description: 'Book your seat in advance for inter-county trips. Guaranteed space.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'SOS button, trip sharing, verified drivers, and comprehensive insurance.',
  },
  {
    icon: Map,
    title: 'Route Discovery',
    description: 'Find the best route to your destination. Compare fares and travel times.',
  },
  {
    icon: Star,
    title: 'Ratings & Reviews',
    description: 'Rate your trip and help improve the service. Read reviews before booking.',
  },
]

const stats = [
  { value: '500K+', label: 'Active Users', icon: Users },
  { value: '100K+', label: 'Daily Rides', icon: Bus },
  { value: '50+', label: 'Partner SACCOs', icon: CheckCircle },
  { value: '100+', label: 'Routes Covered', icon: Map },
]

const howItWorks = [
  {
    step: 1,
    title: 'Enter Your Destination',
    description: 'Tell us where you want to go. We\'ll find the best matatu routes for you.',
    icon: MapPin,
  },
  {
    step: 2,
    title: 'Choose Your Ride',
    description: 'Compare matatus by ETA, fare, ratings, and amenities. Pick the best one.',
    icon: Bus,
  },
  {
    step: 3,
    title: 'Pay Cashlessly',
    description: 'Pay instantly with M-Pesa or your wallet. No cash needed.',
    icon: CreditCard,
  },
  {
    step: 4,
    title: 'Track & Ride',
    description: 'Track your matatu in real-time. Get notified when it arrives.',
    icon: Smartphone,
  },
]

export default function Home() {
  const { isDark } = useTheme()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium">Now available in Nairobi & Thika</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Matatu,
                <br />
                <span className="text-accent">Your Way</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Book rides, track matatus in real-time, and pay cashlessly. 
                Kenya's smartest way to travel by matatu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Book a Ride
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/routes"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all border border-white/20"
                >
                  View Routes
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - App Preview */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* App Screen Preview */}
                    <div className="h-full bg-gradient-to-b from-primary to-primary-dark p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-8">
                        <div className="text-white">
                          <div className="text-sm opacity-70">Good morning</div>
                          <div className="font-semibold">John Kamau</div>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-full" />
                      </div>
                      
                      <div className="bg-white rounded-2xl p-4 mb-4">
                        <div className="text-sm text-gray-500 mb-2">Where to?</div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="font-medium text-gray-800">Nairobi CBD</span>
                        </div>
                      </div>

                      <div className="flex-1 bg-white/10 rounded-2xl p-4">
                        <div className="text-white text-sm mb-3">Nearby Matatus</div>
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/20 rounded-xl p-3 flex items-center gap-3">
                              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                                <Bus className="w-5 h-5 text-primary-dark" />
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-medium text-sm">Super Metro</div>
                                <div className="text-white/70 text-xs">{i * 3} min away</div>
                              </div>
                              <div className="text-accent font-semibold">KSh 100</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-16 top-20 bg-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Ride Confirmed</div>
                      <div className="text-sm text-gray-500">Arriving in 5 min</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-12 bottom-32 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-accent-dark" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Payment Sent</div>
                      <div className="text-sm text-gray-500">KSh 150 via M-Pesa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-surface-dark' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">Matatu</span><span className="text-accent">Connect</span>?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              We're transforming how Kenyans travel by matatu with technology that puts you in control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                    : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={isDark ? 'text-muted-dark' : 'text-muted'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              Getting a ride is as easy as 1-2-3-4. Here's how to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
                )}
                
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className={isDark ? 'text-muted-dark' : 'text-muted'}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who are already enjoying smarter, safer, and more convenient matatu travel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/download"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all border border-white/20"
            >
              <Download className="w-5 h-5" />
              Download App
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
