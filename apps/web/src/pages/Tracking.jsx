import { useState, useEffect } from 'react'
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Share2, 
  AlertTriangle,
  Bus,
  Star,
  User,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const mockTrip = {
  id: 'TRIP-001',
  status: 'in_transit',
  sacco: 'Super Metro',
  vehicle: 'KCB 123A',
  driver: {
    name: 'John Kamau',
    phone: '+254 712 345 678',
    rating: 4.8,
    trips: 1250,
  },
  route: 'Thika - Nairobi CBD',
  pickup: 'Thika Town Stage',
  destination: 'Kencom, Nairobi',
  fare: 150,
  eta: 25,
  distance: '32 km remaining',
  stages: [
    { name: 'Thika Town', status: 'passed', time: '8:30 AM' },
    { name: 'Makongeni', status: 'passed', time: '8:45 AM' },
    { name: 'Juja', status: 'passed', time: '9:00 AM' },
    { name: 'Ruiru', status: 'current', time: '9:15 AM' },
    { name: 'Kahawa West', status: 'upcoming', time: '~9:25 AM' },
    { name: 'Roysambu', status: 'upcoming', time: '~9:35 AM' },
    { name: 'Kencom', status: 'upcoming', time: '~9:55 AM' },
  ],
}

export default function Tracking() {
  const { isDark } = useTheme()
  const [trip, setTrip] = useState(mockTrip)
  const [eta, setEta] = useState(mockTrip.eta)

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'bg-green-500'
      case 'current': return 'bg-accent animate-pulse'
      case 'upcoming': return isDark ? 'bg-white/20' : 'bg-gray-300'
      default: return 'bg-gray-300'
    }
  }

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'passed': return 'text-green-500'
      case 'current': return 'text-accent font-semibold'
      default: return isDark ? 'text-muted-dark' : 'text-muted'
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-surface-dark' : 'bg-gray-50'}`}>
      {/* Map Section with Static Map */}
      <div className="h-80 relative">
        <img
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-u+22C55E(37.0693,-1.0333),pin-s-m+006B3F(36.888,-1.22),pin-s-d+FFB800(36.8172,-1.2864)/36.9,-1.16,10,0/800x320@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN ?? ''}`}
          alt="Trip tracking map"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className={`absolute inset-0 items-center justify-center hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="text-center">
            <Navigation className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-muted-dark' : 'text-muted'}`} />
            <p className={isDark ? 'text-muted-dark' : 'text-muted'}>Map unavailable</p>
          </div>
        </div>

        {/* Map Legend */}
        <div className={`absolute bottom-4 left-4 flex gap-4 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} shadow-lg`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm">Matatu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm">Destination</span>
          </div>
        </div>

        {/* ETA Badge */}
        <div className="absolute top-4 right-4 bg-primary text-white px-6 py-3 rounded-xl shadow-lg">
          <div className="text-sm opacity-80">ETA</div>
          <div className="text-2xl font-bold">{eta} min</div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-accent text-primary-dark px-4 py-2 rounded-full font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-dark rounded-full animate-pulse" />
          On the way
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Route Progress */}
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-lg font-semibold mb-4">Route Progress</h2>
              
              <div className="space-y-4">
                {trip.stages.map((stage, index) => (
                  <div key={stage.name} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(stage.status)}`}>
                        {stage.status === 'passed' && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      {index < trip.stages.length - 1 && (
                        <div className={`w-0.5 h-8 ${
                          stage.status === 'passed' ? 'bg-green-500' : isDark ? 'bg-white/20' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${getStatusTextColor(stage.status)}`}>
                        {stage.name}
                        {stage.status === 'current' && ' (Current)'}
                      </div>
                    </div>
                    <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                      {stage.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trip Details */}
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-lg font-semibold mb-4">Trip Details</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Route</div>
                  <div className="font-medium">{trip.route}</div>
                </div>
                <div>
                  <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Distance</div>
                  <div className="font-medium">{trip.distance}</div>
                </div>
                <div>
                  <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Pickup</div>
                  <div className="font-medium">{trip.pickup}</div>
                </div>
                <div>
                  <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Destination</div>
                  <div className="font-medium">{trip.destination}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-lg font-semibold mb-4">Driver & Vehicle</h2>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{trip.driver.name}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span>{trip.driver.rating}</span>
                    <span className={isDark ? 'text-muted-dark' : 'text-muted'}>
                      • {trip.driver.trips} trips
                    </span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-3">
                  <Bus className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">{trip.sacco}</div>
                    <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                      {trip.vehicle}
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors">
                <Phone className="w-5 h-5" />
                Call Driver
              </button>
            </div>

            {/* Actions */}
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share Trip</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Emergency SOS</span>
                </button>
              </div>
            </div>

            {/* Fare */}
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}>
              <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Total Fare</div>
              <div className="text-3xl font-bold text-primary">KSh {trip.fare}</div>
              <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>Paid via M-Pesa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
