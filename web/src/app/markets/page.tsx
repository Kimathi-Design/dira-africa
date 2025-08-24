'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Filter, TrendingUp, Clock, DollarSign, Users, Globe, Zap, 
  Building2, Heart, Star, Eye, Trophy, Vote, Music, Monitor, 
  TrendingDown, Shield, BookOpen, Leaf, GraduationCap, Rocket
} from 'lucide-react'
import Link from 'next/link'
import { useMarkets } from '@/hooks/useMarkets'

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  
  const { markets, loading, error } = useMarkets()

  console.log('MarketsPage render:', { markets: markets.length, loading, error })

  // Category configuration with icons
  const categories = [
    { id: 'all', name: 'All Markets', icon: Globe },
    { id: 'FOOTBALL', name: 'Football', icon: Trophy },
    { id: 'ELECTIONS', name: 'Elections', icon: Vote },
    { id: 'ENTERTAINMENT', name: 'Entertainment', icon: Music },
    { id: 'TECHNOLOGY', name: 'Technology', icon: Monitor },
    { id: 'ECONOMY', name: 'Economy', icon: DollarSign },
    { id: 'POLITICS', name: 'Politics', icon: Building2 },
    { id: 'OLYMPICS', name: 'Olympics', icon: TrendingUp },
    { id: 'HEALTH', name: 'Health', icon: Heart },
    { id: 'ENVIRONMENT', name: 'Environment', icon: Leaf },
    { id: 'EDUCATION', name: 'Education', icon: GraduationCap }
  ]

  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'volume', label: 'Volume' },
    { value: 'ending', label: 'Ending Soon' },
    { value: 'newest', label: 'Newest' }
  ]

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let filtered = markets.filter(market => {
      const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           market.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           market.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || market.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort markets
    switch (sortBy) {
      case 'volume':
        filtered.sort((a, b) => b.totalVolume - a.totalVolume)
        break
      case 'ending':
        filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
        break
      case 'trending':
      default:
        filtered.sort((a, b) => b.totalTrades - a.totalTrades)
        break
    }

    return filtered
  }, [markets, searchQuery, selectedCategory, sortBy])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="text-center">
            <div className="text-h1 text-foreground mb-4">Loading Markets...</div>
            <div className="text-body text-muted">Please wait while we fetch the latest markets</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="text-center">
            <div className="text-h1 text-foreground mb-4">Error Loading Markets</div>
            <div className="text-body text-muted mb-6">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-h1 text-foreground mb-4">Prediction Markets</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Trade on the future of Africa. From sports and politics to technology and entertainment.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-border mb-8">
          <div className="container">
            <div className="tabs">
              {categories.map(category => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market, index) => {
            const CategoryIcon = getCategoryIcon(market.category)
            const isEndingSoon = new Date(market.endDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 // 7 days
            
            return (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/markets/${market.id}`}>
                  <div className="market-card group">
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
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Load More */}
        {filteredMarkets.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn btn-outline btn-lg">
              Load More Markets
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <Eye className="h-16 w-16 text-muted mx-auto mb-4" />
            <h3 className="text-h3 text-foreground mb-2">No markets found</h3>
            <p className="text-body text-muted mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
