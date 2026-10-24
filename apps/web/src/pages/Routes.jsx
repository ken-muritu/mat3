import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Bus, 
  ArrowRight,
  Filter,
  ChevronDown,
  Navigation
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const routes = [
  {
    id: 'thika-nairobi',
    name: 'Thika - Nairobi CBD',
    origin: 'Thika Town',
    destination: 'Kencom, Nairobi',
    distance: '45 km',
    duration: '1hr 15min',
    fare: 'KSh 100 - 150',
    saccos: ['Super Metro', '2NK', 'Kenya Mpya'],
    stages: ['Thika', 'Makongeni', 'Juja', 'Ruiru', 'Kahawa', 'Roysambu', 'Kasarani', 'Kencom'],
    rating: 4.5,
    frequency: 'Every 5-10 min',
    popular: true,
  },
  {
    id: 'thika-muranga',
    name: "Thika - Murang'a",
    origin: 'Thika Town',
    destination: "Murang'a Town",
    distance: '55 km',
    duration: '1hr 30min',
    fare: 'KSh 150 - 200',
    saccos: ['Lopha', 'Kenya Mpya'],
    stages: ['Thika', 'Makuyu', 'Kenol', "Murang'a"],
    rating: 4.2,
    frequency: 'Every 15-20 min',
    popular: false,
  },
  {
    id: 'ruiru-cbd',
    name: 'Ruiru - Nairobi CBD',
    origin: 'Ruiru Town',
    destination: 'Kencom, Nairobi',
    distance: '25 km',
    duration: '45 min',
    fare: 'KSh 70 - 100',
    saccos: ['Super Metro', 'Manchester'],
    stages: ['Ruiru', 'Kahawa West', 'Roysambu', 'Kasarani', 'Kencom'],
    rating: 4.4,
    frequency: 'Every 5-10 min',
    popular: true,
  },
  {
    id: 'juja-cbd',
    name: 'Juja - Nairobi CBD',
    origin: 'Juja Town',
    destination: 'Kencom, Nairobi',
    distance: '35 km',
    duration: '1hr',
    fare: 'KSh 80 - 120',
    saccos: ['2NK', 'Manchester'],
    stages: ['Juja', 'Ruiru', 'Kahawa', 'Roysambu', 'Kasarani', 'Kencom'],
    rating: 4.3,
    frequency: 'Every 10-15 min',
    popular: true,
  },
  {
    id: 'cbd-westlands',
    name: 'CBD - Westlands',
    origin: 'Kencom, Nairobi',
    destination: 'Westlands',
    distance: '5 km',
    duration: '20 min',
    fare: 'KSh 30 - 50',
    saccos: ['City Hoppa', 'KBS'],
    stages: ['Kencom', 'University Way', 'Museum Hill', 'Westlands'],
    rating: 4.1,
    frequency: 'Every 3-5 min',
    popular: true,
  },
  {
    id: 'cbd-karen',
    name: 'CBD - Karen',
    origin: 'Kencom, Nairobi',
    destination: 'Karen',
    distance: '15 km',
    duration: '40 min',
    fare: 'KSh 60 - 80',
    saccos: ['Citi Hoppa', 'Double M'],
    stages: ['Kencom', 'Uhuru Highway', 'Langata Road', 'Karen'],
    rating: 4.0,
    frequency: 'Every 10-15 min',
    popular: false,
  },
]

export default function Routes_() {
  const { isDark } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = 
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'popular') return matchesSearch && route.popular
    return matchesSearch
  })

  return (
    <div className={`min-h-screen ${isDark ? 'bg-surface-dark' : 'bg-gray-50'}`}>
      {/* Header */}
      <section className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Routes
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl">
            Find matatu routes across Nairobi and beyond. View fares, travel times, and partner SACCOs.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes, stages, or destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-6 py-4 rounded-xl font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-accent text-primary-dark'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Routes
              </button>
              <button
                onClick={() => setSelectedFilter('popular')}
                className={`px-6 py-4 rounded-xl font-medium transition-colors ${
                  selectedFilter === 'popular'
                    ? 'bg-accent text-primary-dark'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Popular
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Routes List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className={isDark ? 'text-muted-dark' : 'text-muted'}>
              Showing {filteredRoutes.length} routes
            </p>
          </div>

          <div className="grid gap-6">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className={`rounded-2xl overflow-hidden transition-all hover:shadow-xl ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Route Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold">{route.name}</h3>
                        {route.popular && (
                          <span className="px-2 py-1 bg-accent/20 text-accent-dark text-xs font-medium rounded-full">
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Origin to Destination */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-full" />
                          <span className={isDark ? 'text-text-dark' : 'text-text'}>{route.origin}</span>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-accent rounded-full" />
                          <span className={isDark ? 'text-text-dark' : 'text-text'}>{route.destination}</span>
                        </div>
                      </div>

                      {/* Stages */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {route.stages.map((stage, index) => (
                          <span
                            key={stage}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDark ? 'bg-white/10 text-muted-dark' : 'bg-gray-100 text-muted'
                            }`}
                          >
                            {stage}
                          </span>
                        ))}
                      </div>

                      {/* SACCOs */}
                      <div className="flex items-center gap-2">
                        <Bus className={`w-4 h-4 ${isDark ? 'text-muted-dark' : 'text-muted'}`} />
                        <span className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                          {route.saccos.join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap lg:flex-nowrap gap-6 lg:gap-8">
                      <div className="text-center">
                        <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Distance</div>
                        <div className="font-semibold">{route.distance}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Duration</div>
                        <div className="font-semibold">{route.duration}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Fare</div>
                        <div className="font-semibold text-primary">{route.fare}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Rating</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          <span className="font-semibold">{route.rating}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Frequency</div>
                        <div className="font-semibold text-sm">{route.frequency}</div>
                      </div>
                    </div>

                    {/* Action */}
                    <div>
                      <Link
                        to={`/book?route=${route.id}`}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <Navigation className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-muted-dark' : 'text-muted'}`} />
              <h3 className="text-xl font-semibold mb-2">No routes found</h3>
              <p className={isDark ? 'text-muted-dark' : 'text-muted'}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      <section className={`py-12 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">More Routes Coming Soon</h2>
          <p className={`mb-6 ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
            We're expanding to cover all major routes in Nairobi and beyond. 
            Mombasa Road, Ngong Road, Waiyaki Way, and inter-county routes coming soon!
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold"
          >
            Learn about our expansion plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
