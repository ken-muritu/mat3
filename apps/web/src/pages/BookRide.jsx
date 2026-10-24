import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Bus, 
  Star, 
  Wallet,
  CreditCard,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Users,
  Wifi,
  Wind,
  Usb,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const nearbyMatatus = [
  {
    id: 1,
    sacco: 'Super Metro',
    route: 'Thika - Nairobi CBD',
    vehicle: 'KCB 123A',
    driver: 'John K.',
    rating: 4.8,
    eta: 3,
    fare: 100,
    seats: 5,
    amenities: ['wifi', 'usb'],
  },
  {
    id: 2,
    sacco: '2NK Sacco',
    route: 'Thika - Nairobi CBD',
    vehicle: 'KDA 456B',
    driver: 'Peter M.',
    rating: 4.5,
    eta: 7,
    fare: 100,
    seats: 8,
    amenities: ['ac'],
  },
  {
    id: 3,
    sacco: 'Kenya Mpya',
    route: 'Thika - Nairobi CBD',
    vehicle: 'KDB 789C',
    driver: 'James O.',
    rating: 4.6,
    eta: 12,
    fare: 90,
    seats: 3,
    amenities: ['wifi', 'ac', 'usb'],
  },
]

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, description: 'Pay with M-Pesa' },
  { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'KSh 500 balance' },
  { id: 'card', name: 'Card', icon: CreditCard, description: 'Visa •••• 4242' },
]

const amenityIcons = {
  wifi: Wifi,
  ac: Wind,
  usb: Usb,
}

export default function BookRide() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedMatatu, setSelectedMatatu] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState('mpesa')

  const handleSearch = (e) => {
    e.preventDefault()
    if (pickup && destination) {
      setStep(2)
    }
  }

  const handleSelectMatatu = (matatu) => {
    setSelectedMatatu(matatu)
    setStep(3)
  }

  const handleConfirmBooking = () => {
    setStep(4)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-surface-dark' : 'bg-gray-50'}`}>
      {/* Progress Steps */}
      <div className={`border-b ${isDark ? 'border-white/10 bg-surface-dark' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {['Location', 'Select Matatu', 'Payment', 'Confirmed'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  step > index + 1
                    ? 'bg-primary text-white'
                    : step === index + 1
                    ? 'bg-accent text-primary-dark'
                    : isDark
                    ? 'bg-white/10 text-muted-dark'
                    : 'bg-gray-200 text-muted'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${
                  step >= index + 1 ? '' : isDark ? 'text-muted-dark' : 'text-muted'
                }`}>
                  {label}
                </span>
                {index < 3 && (
                  <ChevronRight className={`w-5 h-5 mx-2 ${isDark ? 'text-muted-dark' : 'text-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Enter Location */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Where are you going?</h1>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className={`rounded-xl overflow-hidden ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
              }`}>
                <div className="p-4 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className={`flex-1 bg-transparent outline-none ${
                        isDark ? 'placeholder-muted-dark' : 'placeholder-muted'
                      }`}
                    />
                    <button type="button" className="text-primary">
                      <Navigation className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className={`flex-1 bg-transparent outline-none ${
                        isDark ? 'placeholder-muted-dark' : 'placeholder-muted'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Destinations */}
              <div>
                <p className={`text-sm mb-3 ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                  Popular destinations
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Nairobi CBD', 'Westlands', 'Thika Town', 'Ruiru'].map((place) => (
                    <button
                      key={place}
                      type="button"
                      onClick={() => setDestination(place)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        isDark
                          ? 'bg-white/10 hover:bg-white/20'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!pickup || !destination}
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
              >
                Find Matatus
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Select Matatu */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className={`mb-4 text-sm ${isDark ? 'text-muted-dark' : 'text-muted'} hover:text-primary`}
            >
              ← Change location
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">{pickup}</span>
              <ArrowRight className="w-4 h-4 text-muted" />
              <span className="font-medium">{destination}</span>
            </div>

            <h2 className="text-xl font-bold mb-4">Available Matatus</h2>
            
            <div className="space-y-4">
              {nearbyMatatus.map((matatu) => (
                <button
                  key={matatu.id}
                  onClick={() => handleSelectMatatu(matatu)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isDark
                      ? 'bg-white/5 border border-white/10 hover:border-accent'
                      : 'bg-white border border-gray-200 hover:border-primary hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{matatu.sacco}</span>
                        <span className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                          • {matatu.vehicle}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-accent fill-accent" />
                          {matatu.rating}
                        </span>
                        <span className={isDark ? 'text-muted-dark' : 'text-muted'}>
                          {matatu.driver}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">KSh {matatu.fare}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{matatu.eta} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{matatu.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {matatu.amenities.map((amenity) => {
                          const Icon = amenityIcons[amenity]
                          return Icon ? (
                            <Icon key={amenity} className={`w-4 h-4 ${isDark ? 'text-muted-dark' : 'text-muted'}`} />
                          ) : null
                        })}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && selectedMatatu && (
          <div>
            <button
              onClick={() => setStep(2)}
              className={`mb-4 text-sm ${isDark ? 'text-muted-dark' : 'text-muted'} hover:text-primary`}
            >
              ← Choose different matatu
            </button>

            <h2 className="text-xl font-bold mb-6">Confirm & Pay</h2>

            {/* Trip Summary */}
            <div className={`p-4 rounded-xl mb-6 ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Bus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{selectedMatatu.sacco}</div>
                  <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                    {selectedMatatu.vehicle} • {selectedMatatu.driver}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-muted-dark' : 'text-muted'}>From</span>
                  <span>{pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-muted-dark' : 'text-muted'}>To</span>
                  <span>{destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-muted-dark' : 'text-muted'}>ETA</span>
                  <span>{selectedMatatu.eta} minutes</span>
                </div>
                <div className={`border-t pt-2 mt-2 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">KSh {selectedMatatu.fare}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                    selectedPayment === method.id
                      ? 'border-2 border-primary bg-primary/5'
                      : isDark
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedPayment === method.id ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{method.name}</div>
                    <div className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
                      {method.description}
                    </div>
                  </div>
                  {selectedPayment === method.id && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full bg-accent hover:bg-accent-dark text-primary-dark font-semibold py-4 rounded-xl transition-colors"
            >
              Pay KSh {selectedMatatu.fare} & Book
            </button>
          </div>
        )}

        {/* Step 4: Confirmed */}
        {step === 4 && selectedMatatu && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
            <p className={`mb-8 ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              Your matatu is on the way. Track it in real-time.
            </p>

            <div className={`p-6 rounded-xl mb-6 ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bus className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="text-3xl font-bold text-accent mb-2">
                {selectedMatatu.eta} min
              </div>
              <p className={isDark ? 'text-muted-dark' : 'text-muted'}>
                Estimated arrival time
              </p>

              <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className={isDark ? 'text-muted-dark' : 'text-muted'}>Vehicle</div>
                    <div className="font-medium">{selectedMatatu.vehicle}</div>
                  </div>
                  <div>
                    <div className={isDark ? 'text-muted-dark' : 'text-muted'}>Driver</div>
                    <div className="font-medium">{selectedMatatu.driver}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/tracking')}
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Track Matatu
              </button>
              <button className={`flex-1 font-semibold py-3 rounded-xl transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                Share Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
