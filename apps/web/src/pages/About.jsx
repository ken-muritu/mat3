import { Link } from 'react-router-dom'
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Building,
  TrendingUp
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Every feature we build prioritizes passenger and driver safety above all else.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We work hand-in-hand with SACCOs, drivers, and passengers to build what matters.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We leverage cutting-edge technology to solve real problems in public transport.',
  },
  {
    icon: Heart,
    title: 'Accessibility',
    description: 'Affordable, inclusive transport for all Kenyans, regardless of location or income.',
  },
]

const milestones = [
  { year: '2024', title: 'Idea Born', description: 'Ma3 concept developed to address transport challenges' },
  { year: '2025', title: 'Development', description: 'Platform development and SACCO partnerships initiated' },
  { year: '2026', title: 'Pilot Launch', description: 'Launch on Thika Road corridor with 5+ partner SACCOs' },
  { year: '2027', title: 'National Expansion', description: 'Expand to all major Kenyan cities and inter-county routes' },
]

const team = [
  { name: 'Leadership Team', role: 'Experienced entrepreneurs and transport experts' },
  { name: 'Engineering', role: 'World-class developers building for scale' },
  { name: 'Operations', role: 'On-ground teams ensuring seamless service' },
  { name: 'Partnerships', role: 'Building relationships with SACCOs nationwide' },
]

export default function About() {
  const { isDark } = useTheme()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transforming Kenya's
              <br />
              <span className="text-accent">Public Transport</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              We're on a mission to digitize Kenya's matatu sector, making travel safer, 
              more convenient, and more efficient for millions of Kenyans.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold px-6 py-3 rounded-full transition-all"
              >
                Try It Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-20 ${isDark ? 'bg-surface-dark' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50'}`}>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className={isDark ? 'text-muted-dark' : 'text-muted'}>
                To become Kenya's leading digital transport platform, revolutionizing the matatu 
                experience through technology while preserving the cultural essence and economic 
                structure of the SACCO system. We aim to make every matatu ride safe, predictable, 
                and cashless.
              </p>
            </div>
            
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50'}`}>
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className={isDark ? 'text-muted-dark' : 'text-muted'}>
                A Kenya where every person can travel by matatu with confidence—knowing their ride 
                is safe, their payment is secure, and their time is valued. We envision a future 
                where technology empowers both passengers and operators to thrive together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className={`py-20 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem We're Solving</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              Kenya's matatu sector serves 70% of Nairobi's 4.5 million residents daily, 
              yet faces significant challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Unpredictable Wait Times', desc: 'No visibility into when the next matatu will arrive' },
              { title: 'Safety Concerns', desc: '4,000+ annual road fatalities, limited driver accountability' },
              { title: 'Cash Handling Issues', desc: 'Disputes over change, risk of theft, payment friction' },
              { title: 'Route Uncertainty', desc: 'First-time users struggle to identify correct routes' },
              { title: 'No Accountability', desc: 'Limited recourse for passenger complaints' },
              { title: 'Revenue Leakage', desc: 'SACCOs lose 15-30% of revenue to underreporting' },
            ].map((problem, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${isDark ? 'bg-surface-dark border border-white/10' : 'bg-white border border-gray-200'}`}
              >
                <h3 className="font-semibold mb-2">{problem.title}</h3>
                <p className={`text-sm ${isDark ? 'text-muted-dark' : 'text-muted'}`}>{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className={`py-20 ${isDark ? 'bg-surface-dark' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              The principles that guide everything we do at Ma3.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className={isDark ? 'text-muted-dark' : 'text-muted'}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`py-20 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              From idea to national impact—our roadmap to transforming Kenya's transport.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`p-6 rounded-xl inline-block ${
                      isDark ? 'bg-surface-dark border border-white/10' : 'bg-white shadow-lg'
                    }`}>
                      <div className="text-accent font-bold text-lg mb-1">{milestone.year}</div>
                      <h3 className="font-semibold text-xl mb-2">{milestone.title}</h3>
                      <p className={isDark ? 'text-muted-dark' : 'text-muted'}>{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white dark:border-surface-dark" />
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Goals */}
      <section className={`py-20 ${isDark ? 'bg-surface-dark' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact Goals</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-muted-dark' : 'text-muted'}`}>
              We're not just building a business—we're creating lasting social impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '30%', label: 'Reduction in matatu-related incidents' },
              { value: '100K+', label: 'Jobs for drivers and conductors' },
              { value: '2M+', label: 'Active users by 2027' },
              { value: '20%', label: 'Reduction in urban congestion' },
            ].map((goal, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50'
                }`}
              >
                <div className="text-4xl font-bold text-primary mb-2">{goal.value}</div>
                <p className={isDark ? 'text-muted-dark' : 'text-muted'}>{goal.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Whether you're a passenger, driver, or SACCO, there's a place for you in Kenya's transport revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary-dark font-semibold px-8 py-4 rounded-full transition-all"
            >
              Start Riding
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="mailto:partners@matatuconnect.co.ke"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all border border-white/20"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
