'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, TrendingUp, Users, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BettingModal } from './BettingModal'
import { cn, formatCurrency, formatPercentage, formatDate, getCategoryColor, getCategoryIcon } from '@/lib/utils'

interface MarketCardProps {
  market: {
    id: string
    title: string
    description?: string
    category: string
    totalVolume: number
    totalTrades: number
    endDate: string
    outcomes: Array<{
      name: string
      probability: number
      volume: number
    }>
    isFeatured?: boolean
    tags?: string[]
  }
  onBet?: (marketId: string, outcome: string, amount: number) => void
  onFavorite?: (marketId: string) => void
  onViewDetails?: (marketId: string) => void
  isFavorited?: boolean
}

export function MarketCard({ market, onBet, onFavorite, onViewDetails, isFavorited = false }: MarketCardProps) {
  const [selectedOutcome, setSelectedOutcome] = React.useState<string | null>(null)
  const [showBettingModal, setShowBettingModal] = React.useState(false)

  const handleOutcomeClick = (outcomeName: string) => {
    setSelectedOutcome(outcomeName)
    setShowBettingModal(true)
  }

  const handlePlaceBet = async (marketId: string, outcome: string, amount: number) => {
    if (onBet) {
      await onBet(marketId, outcome, amount)
    }
  }

  const handleFavorite = () => {
    if (onFavorite) {
      onFavorite(market.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-brand/50 transition-all duration-300 shadow-sm",
        market.isFeatured && "ring-2 ring-brand/20"
      )}
    >
      {/* Featured Badge */}
      {market.isFeatured && (
        <div className="absolute -top-2 -right-2 bg-brand text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
          Featured
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getCategoryIcon(market.category)}</span>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium text-white",
            getCategoryColor(market.category)
          )}>
            {market.category}
          </span>
        </div>
        <button
          onClick={handleFavorite}
          className={cn(
            "p-2 rounded-full transition-colors duration-200",
            isFavorited 
              ? "text-red-500 hover:text-red-600" 
              : "text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
        </button>
      </div>

      {/* Title and Description */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors duration-200">
        {market.title}
      </h3>
      {market.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {market.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <span>{formatCurrency(market.totalVolume)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{market.totalTrades} trades</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatDate(market.endDate)}</span>
        </div>
      </div>

      {/* Outcomes */}
      <div className="space-y-2 mb-4">
        {market.outcomes.map((outcome) => (
          <motion.button
            key={outcome.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOutcomeClick(outcome.name)}
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand/50 transition-all duration-200 text-left bg-white dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white">{outcome.name}</span>
              <div className="text-right">
                <div className="text-sm font-semibold text-brand dark:text-brand-light">
                  {formatPercentage(outcome.probability)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {formatCurrency(outcome.volume)}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-brand dark:bg-brand-light h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${outcome.probability * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>



      {/* Tags */}
      {market.tags && market.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {market.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* View Details Button */}
      <Button 
        variant="outline" 
        className="w-full group-hover:bg-brand group-hover:text-white dark:group-hover:bg-brand dark:group-hover:text-white transition-all duration-200"
        onClick={() => onViewDetails?.(market.id)}
      >
        View Details
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>

      {/* Betting Modal */}
      {selectedOutcome && (
        <BettingModal
          isOpen={showBettingModal}
          onClose={() => {
            setShowBettingModal(false)
            setSelectedOutcome(null)
          }}
          market={market}
          outcome={market.outcomes.find(o => o.name === selectedOutcome)!}
          onPlaceBet={handlePlaceBet}
        />
      )}
    </motion.div>
  )
}
