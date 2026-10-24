import { Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Routes_ from './pages/Routes'
import BookRide from './pages/BookRide'
import Safety from './pages/Safety'
import Tracking from './pages/Tracking'
import Download from './pages/Download'

function App() {
  const { isDark } = useTheme()
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-surface-dark text-text-dark' : 'bg-white text-text'
    }`}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/routes" element={<Routes_ />} />
          <Route path="/book" element={<BookRide />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
