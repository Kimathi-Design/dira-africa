'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Filter, TrendingUp, Clock, DollarSign, Users, Globe, Zap, 
  Building2, Heart, Star, Eye, Trophy, Vote, Music, Monitor, 
  TrendingDown, Shield, BookOpen, Leaf, GraduationCap, Rocket, ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { useMarkets } from '@/hooks/useMarkets'

export default function HomePage() {
  const { markets, loading } = useMarkets()

  // Get featured markets (first 6 markets that are featured or have high volume)
  const featuredMarkets = markets
    .filter(market => market.isFeatured || market.totalVolume > 30000)
    .slice(0, 6)

  // Category configuration with icons
  const categories = [
    { id: 'FOOTBALL', name: 'Football', icon: Trophy, count: markets.filter(m => m.category === 'FOOTBALL').length },
    { id: 'ELECTIONS', name: 'Elections', icon: Vote, count: markets.filter(m => m.category === 'ELECTIONS').length },
    { id: 'ENTERTAINMENT', name: 'Entertainment', icon: Music, count: markets.filter(m => m.category === 'ENTERTAINMENT').length },
    { id: 'TECHNOLOGY', name: 'Technology', icon: Monitor, count: markets.filter(m => m.category === 'TECHNOLOGY').length },
    { id: 'ECONOMY', name: 'Economy', icon: DollarSign, count: markets.filter(m => m.category === 'ECONOMY').length },
    { id: 'POLITICS', name: 'Politics', icon: Building2, count: markets.filter(m => m.category === 'POLITICS').length }
  ]

  const getCategoryIcon = (category: string) => {
    const categoryConfig = categories.find(cat => cat.id === category)
    return categoryConfig?.icon || Globe
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero py-20">
        <div className="container">
          <div className="hero-content text-center">
            <motion.h1 
              className="text-display text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trade on the Future of
              <span className="text-primary"> Africa</span>
            </motion.h1>
            
            <motion.p 
              className="text-body-lg text-muted mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Predict and profit from African events, politics, sports, technology, and entertainment. 
              Join thousands of traders making informed predictions about Africa's future.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/markets" className="btn btn-primary btn-lg">
                Explore Markets
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link href="/how-it-works" className="btn btn-outline btn-lg">
                How It Works
              </Link>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              className="max-w-md mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Search markets..."
                className="form-input pl-10 w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="stat-number">$2.5M+</div>
              <div className="stat-label">Total Volume Traded</div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Traders</div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="stat-number">25+</div>
              <div className="stat-label">African Countries</div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="stat-number">{markets.length}</div>
              <div className="stat-label">Active Markets</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Markets Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">Trending Markets</h2>
            <p className="text-body-lg text-muted">
              Most popular prediction markets in Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMarkets.map((market, index) => {
              const CategoryIcon = getCategoryIcon(market.category)
              const isEndingSoon = new Date(market.endDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 // 7 days
              
              return (
                <motion.div 
                  key={market.id}
                  className="market-card group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/markets/${market.id}`}>
                    <div className="market-card-header">
                      <div className="market-card-icon">
                        <CategoryIcon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        {market.isFeatured && (
                          <Star className="h-4 w-4 text-warning" />
                        )}
                        {isEndingSoon && (
                          <Clock className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </div>

                    <h3 className="market-card-title">{market.title}</h3>
                    <p className="market-card-subtitle mb-4">
                      {market.description}
                    </p>

                    <div className="market-card-odds">
                      {market.outcomes.slice(0, 2).map((outcome, idx) => (
                        <button
                          key={idx}
                          className={`odds-button ${outcome.name === 'YES' ? 'yes' : 'no'}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="font-semibold">{outcome.name}</div>
                          <div className="text-sm opacity-75">
                            {(outcome.probability * 100).toFixed(0)}%
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="market-card-stats">
                      <div className="market-card-volume">
                        <DollarSign className="h-3 w-3 inline mr-1" />
                        {formatCurrency(market.totalVolume)}
                      </div>
                      <div className="market-card-volume">
                        <Users className="h-3 w-3 inline mr-1" />
                        {formatNumber(market.totalTrades)} trades
                      </div>
                    </div>

                    {market.tags && market.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {market.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/markets" className="btn btn-primary btn-lg">
              View All Markets
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">Market Categories</h2>
            <p className="text-body-lg text-muted">
              Explore diverse prediction markets across Africa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/markets?category=${category.id}`}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-h4 text-foreground mb-2">{category.name}</h3>
                    <p className="text-body-sm text-muted">{category.count} markets</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">How It Works</h2>
            <p className="text-body-lg text-muted">
              Start trading on African prediction markets in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-h3 text-primary font-bold">1</span>
              </div>
              <h3 className="text-h4 text-foreground mb-4">Choose a Market</h3>
              <p className="text-body text-muted">
                Browse our diverse selection of prediction markets covering sports, politics, entertainment, and more.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-h3 text-primary font-bold">2</span>
              </div>
              <h3 className="text-h4 text-foreground mb-4">Make Your Prediction</h3>
              <p className="text-body text-muted">
                Select your outcome and place your bet. The more accurate your prediction, the more you can earn.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-h3 text-primary font-bold">3</span>
              </div>
              <h3 className="text-h4 text-foreground mb-4">Collect Your Winnings</h3>
              <p className="text-body text-muted">
                When the market resolves, collect your winnings if your prediction was correct.
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link href="/how-it-works" className="btn btn-outline btn-lg">
              Learn More
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="text-center">
            <motion.h2 
              className="text-h2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Start Trading?
            </motion.h2>
            <motion.p 
              className="text-body-lg text-muted mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of traders making predictions about Africa's future. 
              Start with as little as $1 and trade on what you know.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/register" className="btn btn-primary btn-lg">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link href="/markets" className="btn btn-outline btn-lg">
                Browse Markets
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
