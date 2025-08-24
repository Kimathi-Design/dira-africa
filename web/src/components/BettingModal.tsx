'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'

interface BettingModalProps {
  isOpen: boolean
  onClose: () => void
  market: {
    id: string
    title: string
    category: string
  }
  outcome: {
    name: string
    probability: number
    volume: number
  }
  onPlaceBet: (marketId: string, outcome: string, amount: number) => void
}

export function BettingModal({ isOpen, onClose, market, outcome, onPlaceBet }: BettingModalProps) {
  const [betAmount, setBetAmount] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handlePlaceBet = async () => {
    if (!betAmount || parseFloat(betAmount) <= 0) return

    setIsLoading(true)
    try {
      await onPlaceBet(market.id, outcome.name, parseFloat(betAmount))
      onClose()
      setBetAmount('')
    } catch (error) {
      console.error('Betting error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const potentialPayout = betAmount ? (parseFloat(betAmount) / outcome.probability) : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Place Your Bet</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Market Info */}
            <div className="mb-6">
              <h3 className="font-medium text-foreground mb-2">{market.title}</h3>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Your Selection:</span>
                <span className="font-semibold text-primary">{outcome.name}</span>
              </div>
            </div>

            {/* Bet Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Bet Amount (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="number"
                  placeholder="0.00"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Bet Details */}
            {betAmount && parseFloat(betAmount) > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-muted/30 rounded-lg"
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Probability:</span>
                    <span className="font-semibold text-foreground">
                      {formatPercentage(outcome.probability)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Potential Payout:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(potentialPayout)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Potential Profit:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(potentialPayout - parseFloat(betAmount))}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-700">
                Prediction markets involve risk. Only bet what you can afford to lose.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePlaceBet}
                disabled={!betAmount || parseFloat(betAmount) <= 0 || isLoading}
                className="flex-1"
              >
                {isLoading ? 'Placing Bet...' : 'Place Bet'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
