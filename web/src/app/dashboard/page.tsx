'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Activity, Calendar, ArrowRight, Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import Link from 'next/link'

// Sample user data
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  balance: 2500.50,
  totalBets: 45,
  winRate: 0.68,
  totalWinnings: 3200.75,
  totalLosses: 1200.25,
  netProfit: 2000.50
}

// Sample recent bets
const recentBets = [
  {
    id: 1,
    market: 'Will Kenya win AFCON 2025?',
    outcome: 'YES',
    amount: 500,
    potentialPayout: 1428.57,
    status: 'active',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    market: 'Who will win the 2024 Nigerian Presidential Election?',
    outcome: 'Bola Tinubu',
    amount: 300,
    potentialPayout: 666.67,
    status: 'active',
    timestamp: '1 day ago'
  },
  {
    id: 3,
    market: 'Will Bitcoin reach $100,000 by end of 2024?',
    outcome: 'NO',
    amount: 200,
    potentialPayout: 266.67,
    status: 'won',
    timestamp: '3 days ago'
  },
  {
    id: 4,
    market: 'Will South Africa host the 2030 FIFA World Cup?',
    outcome: 'NO',
    amount: 150,
    potentialPayout: 176.47,
    status: 'active',
    timestamp: '1 week ago'
  }
]

// Sample portfolio performance
const portfolioData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [1000, 1200, 1100, 1400, 1800, 2500]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'bets' | 'portfolio'>('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'text-green-600 bg-green-500/10'
      case 'lost': return 'text-red-600 bg-red-500/10'
      case 'active': return 'text-blue-600 bg-blue-500/10'
      default: return 'text-gray-600 bg-gray-500/10'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'won': return 'Won'
      case 'lost': return 'Lost'
      case 'active': return 'Active'
      default: return 'Pending'
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Welcome back, {userData.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand dark:hover:border-brand-light dark:hover:text-brand-light">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-teal-600">
                <Plus className="w-4 h-4 mr-2" />
                New Bet
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(userData.balance)}</h3>
            <p className="text-gray-600 dark:text-gray-400">Available Balance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{userData.totalBets}</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Bets</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatPercentage(userData.winRate)}</h3>
            <p className="text-gray-600 dark:text-gray-400">Win Rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatCurrency(userData.netProfit)}</h3>
            <p className="text-gray-600 dark:text-gray-400">Net Profit</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'bets', label: 'Recent Bets' },
            { id: 'portfolio', label: 'Portfolio' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand-light"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentBets.slice(0, 3).map((bet) => (
                  <div key={bet.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{bet.market}</p>
                      <p className="text-sm text-muted-foreground">{bet.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{formatCurrency(bet.amount)}</p>
                      <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(bet.status))}>
                        {getStatusText(bet.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard?tab=bets" className="text-primary hover:underline text-sm">
                  View all activity →
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/markets">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Browse Markets
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Manage Wallet
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bets' && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Bets</h2>
            <div className="space-y-4">
              {recentBets.map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{bet.market}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Outcome: {bet.outcome}</span>
                      <span>Bet: {formatCurrency(bet.amount)}</span>
                      <span>Payout: {formatCurrency(bet.potentialPayout)}</span>
                      <span>{bet.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getStatusColor(bet.status))}>
                      {getStatusText(bet.status)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Portfolio Performance</h2>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">Portfolio chart would be displayed here</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(userData.totalWinnings)}</p>
                <p className="text-muted-foreground">Total Winnings</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{formatCurrency(userData.totalLosses)}</p>
                <p className="text-muted-foreground">Total Losses</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(userData.netProfit)}</p>
                <p className="text-muted-foreground">Net Profit</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
