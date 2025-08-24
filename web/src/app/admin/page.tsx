'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Settings, Plus, BarChart3, CheckCircle, Clock, Eye, Edit, Trash2, Globe, Building2, Zap, Download } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock admin data
  const adminData = {
    stats: {
      totalUsers: 15420,
      activeMarkets: 89,
      totalVolume: 2500000,
      totalRevenue: 125000,
      pendingResolutions: 12,
      newUsersToday: 45
    },
    recentActivity: [
      {
        id: 1,
        type: 'market_created',
        title: 'New market created',
        description: 'Nigerian Presidential Election 2027',
        user: 'admin@dira.com',
        timestamp: '2024-01-15T10:30:00Z',
        icon: Plus
      },
      {
        id: 2,
        type: 'market_resolved',
        title: 'Market resolved',
        description: 'AFCON 2025 Winner - Nigeria won',
        user: 'admin@dira.com',
        timestamp: '2024-01-15T09:15:00Z',
        icon: CheckCircle
      },
      {
        id: 3,
        type: 'user_registered',
        title: 'New user registered',
        description: 'john.doe@example.com',
        user: 'system',
        timestamp: '2024-01-15T08:45:00Z',
        icon: Users
      },
      {
        id: 4,
        type: 'market_updated',
        title: 'Market updated',
        description: 'Kenya Economic Growth 2024',
        user: 'admin@dira.com',
        timestamp: '2024-01-15T08:20:00Z',
        icon: Edit
      },
      {
        id: 5,
        type: 'dispute_resolved',
        title: 'Dispute resolved',
        description: 'South Africa Tech Startup IPO',
        user: 'admin@dira.com',
        timestamp: '2024-01-15T07:30:00Z',
        icon: CheckCircle
      }
    ]
  }

  const getActivityIcon = (activity: any) => {
    const Icon = activity.icon
    const colorClass = activity.type === 'market_resolved' || activity.type === 'dispute_resolved'
      ? 'text-success'
      : activity.type === 'market_created'
      ? 'text-primary'
      : activity.type === 'user_registered'
      ? 'text-warning'
      : 'text-muted'
    
    return <Icon className={`h-5 w-5 ${colorClass}`} />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'activity', name: 'Recent Activity', icon: Clock },
    { id: 'create', name: 'Create Market', icon: Plus },
    { id: 'manage', name: 'Manage Markets', icon: BarChart3 },
    { id: 'resolve', name: 'Resolve Markets', icon: CheckCircle },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  return (
    <div>
      {/* Header */}
      <section className="py-8 bg-card">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 mb-2">Admin Dashboard</h1>
              <p className="text-body-lg text-muted">
                Manage markets, users, and platform settings
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
              {/* Stats Cards */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="card">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm text-muted">Total Users</p>
                        <h3 className="text-h3 text-primary">{formatNumber(adminData.stats.totalUsers)}</h3>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-4 flex items-center text-success">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-body-sm">+{adminData.stats.newUsersToday} today</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm text-muted">Active Markets</p>
                        <h3 className="text-h3 text-primary">{adminData.stats.activeMarkets}</h3>
                      </div>
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-4 flex items-center text-success">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-body-sm">+5 this week</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm text-muted">Total Volume</p>
                        <h3 className="text-h3 text-primary">{formatCurrency(adminData.stats.totalVolume)}</h3>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-4 flex items-center text-success">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-body-sm">+12% this month</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm text-muted">Total Revenue</p>
                        <h3 className="text-h3 text-primary">{formatCurrency(adminData.stats.totalRevenue)}</h3>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-4 flex items-center text-success">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-body-sm">+8% this month</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm text-muted">Pending Resolutions</p>
                        <h3 className="text-h3 text-warning">{adminData.stats.pendingResolutions}</h3>
                      </div>
                      <Clock className="h-8 w-8 text-warning" />
                    </div>
                    <div className="mt-4 flex items-center text-muted">
                      <span className="text-body-sm">Requires attention</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-body-sm text-muted">New Users Today</p>
                        <h3 className="text-h3 text-primary">{adminData.stats.newUsersToday}</h3>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-4 flex items-center text-success">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-body-sm">+15% vs yesterday</span>
                    </div>
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
                  <p className="card-subtitle">Common admin tasks</p>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                      onClick={() => setActiveTab('create')}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors text-left"
                    >
                      <Plus className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Create Market</h3>
                      <p className="text-body-sm text-muted">Add a new prediction market</p>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('manage')}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors text-left"
                    >
                      <BarChart3 className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Manage Markets</h3>
                      <p className="text-body-sm text-muted">Edit existing markets</p>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('resolve')}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors text-left"
                    >
                      <CheckCircle className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Resolve Markets</h3>
                      <p className="text-body-sm text-muted">Close and settle markets</p>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors text-left"
                    >
                      <Settings className="h-8 w-8 text-primary mb-3" />
                      <h3 className="text-h4 mb-2">Platform Settings</h3>
                      <p className="text-body-sm text-muted">Configure system settings</p>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div 
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="card-header">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="card-title">Recent Activity</h2>
                      <p className="card-subtitle">Latest admin actions</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('activity')}
                      className="btn btn-outline btn-sm"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <div className="space-y-4">
                    {adminData.recentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getActivityIcon(activity)}
                          <div>
                            <h4 className="text-body font-medium">{activity.title}</h4>
                            <p className="text-body-sm text-muted">{activity.description}</p>
                            <p className="text-body-sm text-muted">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-body-sm text-muted">{activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-h2">Recent Activity</h2>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="space-y-4">
                    {adminData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          {getActivityIcon(activity)}
                          <div>
                            <h4 className="text-body font-medium">{activity.title}</h4>
                            <p className="text-body-sm text-muted">{activity.description}</p>
                            <p className="text-body-sm text-muted">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-body-sm text-muted">{activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create Market Tab */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Create New Market</h2>
                  <p className="card-subtitle">Add a new prediction market to the platform</p>
                </div>
                <div className="card-content">
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Market Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Will Nigeria win AFCON 2025?"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder="Detailed description of the market..."
                        className="form-input form-textarea"
                        rows={4}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-select">
                        <option value="">Select category</option>
                        <option value="FOOTBALL">Football</option>
                        <option value="ELECTIONS">Elections</option>
                        <option value="ENTERTAINMENT">Entertainment</option>
                        <option value="TECHNOLOGY">Technology</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="datetime-local"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Outcomes</label>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Outcome 1 (e.g., Yes)"
                          className="form-input"
                        />
                        <input
                          type="text"
                          placeholder="Outcome 2 (e.g., No)"
                          className="form-input"
                        />
                        <button className="btn btn-outline btn-sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Outcome
                        </button>
                      </div>
                    </div>

                    <button className="btn btn-primary w-full">
                      <Plus className="h-5 w-5 mr-2" />
                      Create Market
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manage Markets Tab */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-h2">Manage Markets</h2>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="btn btn-primary btn-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="space-y-4">
                    {/* Sample market management items */}
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Globe className="h-6 w-6 text-primary" />
                        <div>
                          <h4 className="text-body font-medium">Nigerian Presidential Election 2027</h4>
                          <p className="text-body-sm text-muted">Politics • Ends Dec 2027</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="btn btn-outline btn-sm text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        <div>
                          <h4 className="text-body font-medium">AFCON 2025 Winner</h4>
                          <p className="text-body-sm text-muted">Sports • Ends Jan 2025</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="btn btn-outline btn-sm text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <DollarSign className="h-6 w-6 text-primary" />
                        <div>
                          <h4 className="text-body font-medium">Kenya Economic Growth 2024</h4>
                          <p className="text-body-sm text-muted">Economy • Ends Dec 2024</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-outline btn-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="btn btn-outline btn-sm text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resolve Markets Tab */}
          {activeTab === 'resolve' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-h2">Resolve Markets</h2>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="space-y-4">
                    {/* Sample markets to resolve */}
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Clock className="h-6 w-6 text-warning" />
                        <div>
                          <h4 className="text-body font-medium">AFCON 2025 Winner</h4>
                          <p className="text-body-sm text-muted">Ended Jan 2025 • Needs resolution</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-primary btn-sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Clock className="h-6 w-6 text-warning" />
                        <div>
                          <h4 className="text-body font-medium">Kenya Economic Growth 2024</h4>
                          <p className="text-body-sm text-muted">Ended Dec 2024 • Needs resolution</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-primary btn-sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </button>
                        <button className="btn btn-outline btn-sm">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
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
                  <h2 className="card-title">Platform Settings</h2>
                  <p className="card-subtitle">Configure system-wide settings and preferences</p>
                </div>
                <div className="card-content">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-h4 mb-4">General Settings</h3>
                      <div className="space-y-4">
                        <div className="form-group">
                          <label className="form-label">Platform Name</label>
                          <input
                            type="text"
                            defaultValue="Dira Africa"
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Default Currency</label>
                          <select className="form-select">
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="NGN">NGN</option>
                            <option value="KES">KES</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Minimum Bet Amount</label>
                          <input
                            type="number"
                            defaultValue="1"
                            className="form-input"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-h4 mb-4">Security Settings</h3>
                      <div className="space-y-3">
                        <button className="btn btn-outline w-full justify-start">
                          <Settings className="h-5 w-5 mr-3" />
                          Two-Factor Authentication
                        </button>
                        <button className="btn btn-outline w-full justify-start">
                          <Eye className="h-5 w-5 mr-3" />
                          Session Management
                        </button>
                        <button className="btn btn-outline w-full justify-start">
                          <Building2 className="h-5 w-5 mr-3" />
                          API Keys
                        </button>
                      </div>
                    </div>

                    <button className="btn btn-primary w-full">
                      <Settings className="h-5 w-5 mr-2" />
                      Save Settings
                    </button>
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
