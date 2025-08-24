'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, Plus, Minus, CreditCard, Smartphone, Building2, ArrowRight, Eye, Download, Filter } from 'lucide-react'
import Link from 'next/link'

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock wallet data
  const walletData = {
    balance: 1250.75,
    totalProfit: 342.50,
    totalDeposits: 2500.00,
    totalWithdrawals: 907.25,
    recentTransactions: [
      {
        id: 1,
        type: 'deposit',
        amount: 500.00,
        description: 'Bank Transfer',
        date: '2024-01-15',
        status: 'completed',
        icon: CreditCard
      },
      {
        id: 2,
        type: 'bet',
        amount: -25.00,
        description: 'Nigerian Election Market',
        date: '2024-01-14',
        status: 'completed',
        icon: TrendingDown
      },
      {
        id: 3,
        type: 'win',
        amount: 75.50,
        description: 'AFCON Winner Market',
        date: '2024-01-13',
        status: 'completed',
        icon: TrendingUp
      },
      {
        id: 4,
        type: 'withdrawal',
        amount: -200.00,
        description: 'Mobile Money',
        date: '2024-01-12',
        status: 'completed',
        icon: Smartphone
      },
      {
        id: 5,
        type: 'deposit',
        amount: 300.00,
        description: 'Mobile Money',
        date: '2024-01-10',
        status: 'completed',
        icon: Smartphone
      }
    ]
  }

  const getTransactionIcon = (transaction: any) => {
    const Icon = transaction.icon
    const colorClass = transaction.type === 'win' || transaction.type === 'deposit' 
      ? 'text-success' 
      : transaction.type === 'bet' 
      ? 'text-warning' 
      : 'text-destructive'
    
    return <Icon className={`h-5 w-5 ${colorClass}`} />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'transactions', name: 'Transactions', icon: TrendingUp },
    { id: 'deposit', name: 'Deposit', icon: Plus },
    { id: 'withdraw', name: 'Withdraw', icon: Minus },
    { id: 'settings', name: 'Settings', icon: Building2 }
  ]

  return (
    <div>
      {/* Header */}
      <section className="py-8 bg-card">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 mb-2">Wallet</h1>
              <p className="text-body-lg text-muted">
                Manage your funds and track your trading activity
              </p>
            </div>
            <Link href="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-border">
        <div className="container">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-8">
        <div className="container">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Balance Card */}
              <motion.div 
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h3 className="text-h3 text-primary mb-2">
                        {formatCurrency(walletData.balance)}
                      </h3>
                      <p className="text-body-sm text-muted">Available Balance</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-h3 text-success mb-2">
                        {formatCurrency(walletData.totalProfit)}
                      </h3>
                      <p className="text-body-sm text-muted">Total Profit</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-h3 text-primary mb-2">
                        {formatCurrency(walletData.totalDeposits)}
                      </h3>
                      <p className="text-body-sm text-muted">Total Deposits</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-h3 text-destructive mb-2">
                        {formatCurrency(walletData.totalWithdrawals)}
                      </h3>
                      <p className="text-body-sm text-muted">Total Withdrawals</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <button 
                      onClick={() => setActiveTab('deposit')}
                      className="btn btn-primary flex-1"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Deposit Funds
                    </button>
                    <button 
                      onClick={() => setActiveTab('withdraw')}
                      className="btn btn-outline flex-1"
                    >
                      <Minus className="h-5 w-5 mr-2" />
                      Withdraw Funds
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="card-header">
                  <h2 className="card-title">Quick Actions</h2>
                  <p className="card-subtitle">Fast access to common wallet operations</p>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <CreditCard className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Bank Transfer</h3>
                      <p className="text-body-sm text-muted">Transfer from your bank account</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <Smartphone className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Mobile Money</h3>
                      <p className="text-body-sm text-muted">Use M-Pesa, Airtel Money, etc.</p>
                    </div>
                    <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                      <Building2 className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Card Payment</h3>
                      <p className="text-body-sm text-muted">Pay with credit/debit card</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Transactions */}
              <motion.div 
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="card-header">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="card-title">Recent Transactions</h2>
                      <p className="card-subtitle">Your latest wallet activity</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="btn btn-outline btn-sm"
                    >
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <div className="space-y-4">
                    {walletData.recentTransactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getTransactionIcon(transaction)}
                          <div>
                            <h4 className="text-body font-medium">{transaction.description}</h4>
                            <p className="text-body-sm text-muted">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-body font-semibold ${
                            transaction.type === 'win' || transaction.type === 'deposit' 
                              ? 'text-success' 
                              : 'text-destructive'
                          }`}>
                            {transaction.type === 'win' || transaction.type === 'deposit' ? '+' : ''}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-body-sm text-muted capitalize">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-h2">Transaction History</h2>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="space-y-4">
                    {walletData.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getTransactionIcon(transaction)}
                          <div>
                            <h4 className="text-body font-medium">{transaction.description}</h4>
                            <p className="text-body-sm text-muted">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-body font-semibold ${
                            transaction.type === 'win' || transaction.type === 'deposit' 
                              ? 'text-success' 
                              : 'text-destructive'
                          }`}>
                            {transaction.type === 'win' || transaction.type === 'deposit' ? '+' : ''}
                            {formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-body-sm text-muted capitalize">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposit Tab */}
          {activeTab === 'deposit' && (
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Deposit Funds</h2>
                  <p className="card-subtitle">Add money to your wallet using your preferred method</p>
                </div>
                <div className="card-content">
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="form-input"
                        min="1"
                        step="0.01"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Payment Method</label>
                      <select className="form-select">
                        <option value="">Select payment method</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="mobile">Mobile Money</option>
                      </select>
                    </div>

                    <button className="btn btn-primary w-full">
                      <Plus className="h-5 w-5 mr-2" />
                      Deposit Funds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Withdraw Tab */}
          {activeTab === 'withdraw' && (
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Withdraw Funds</h2>
                  <p className="card-subtitle">Withdraw your earnings to your preferred account</p>
                </div>
                <div className="card-content">
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="form-input"
                        min="1"
                        max={walletData.balance}
                        step="0.01"
                      />
                      <p className="text-body-sm text-muted mt-1">
                        Available: {formatCurrency(walletData.balance)}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Withdrawal Method</label>
                      <select className="form-select">
                        <option value="">Select withdrawal method</option>
                        <option value="bank">Bank Account</option>
                        <option value="mobile">Mobile Money</option>
                        <option value="card">Credit/Debit Card</option>
                      </select>
                    </div>

                    <button className="btn btn-primary w-full">
                      <Minus className="h-5 w-5 mr-2" />
                      Withdraw Funds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Wallet Settings</h2>
                  <p className="card-subtitle">Manage your payment methods and preferences</p>
                </div>
                <div className="card-content">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-h4 mb-4">Payment Methods</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-primary" />
                            <div>
                              <p className="text-body font-medium">Bank Account</p>
                              <p className="text-body-sm text-muted">****1234</p>
                            </div>
                          </div>
                          <button className="btn btn-outline btn-sm">Edit</button>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-6 w-6 text-primary" />
                            <div>
                              <p className="text-body font-medium">Mobile Money</p>
                              <p className="text-body-sm text-muted">+254 700 123 456</p>
                            </div>
                          </div>
                          <button className="btn btn-outline btn-sm">Edit</button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-h4 mb-4">Security</h3>
                      <div className="space-y-3">
                        <button className="btn btn-outline w-full justify-start">
                          <Eye className="h-5 w-5 mr-3" />
                          Change Transaction PIN
                        </button>
                        <button className="btn btn-outline w-full justify-start">
                          <Building2 className="h-5 w-5 mr-3" />
                          Two-Factor Authentication
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
