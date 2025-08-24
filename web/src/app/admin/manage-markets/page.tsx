'use client';

import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Eye, MoreHorizontal, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ManageMarketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const markets = [
    {
      id: '1',
      title: 'Will Kenya win AFCON 2025?',
      category: 'Sports',
      status: 'active',
      totalBets: 1250,
      endDate: '2025-02-15',
      participants: 89,
      volume: 25000
    },
    {
      id: '2',
      title: 'Bitcoin price prediction for Q1 2025',
      category: 'Finance',
      status: 'active',
      totalBets: 890,
      endDate: '2025-03-31',
      participants: 156,
      volume: 45000
    },
    {
      id: '3',
      title: 'Nigerian presidential election outcome',
      category: 'Politics',
      status: 'resolved',
      totalBets: 2100,
      endDate: '2024-12-15',
      participants: 234,
      volume: 75000
    },
    {
      id: '4',
      title: 'Tesla stock performance prediction',
      category: 'Finance',
      status: 'pending',
      totalBets: 0,
      endDate: '2025-06-30',
      participants: 0,
      volume: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || market.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (marketId: string) => {
    alert(`Edit market ${marketId}`);
  };

  const handleDelete = (marketId: string) => {
    if (confirm('Are you sure you want to delete this market?')) {
      alert(`Delete market ${marketId}`);
    }
  };

  const handleView = (marketId: string) => {
    window.location.href = `/markets/${marketId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 dark:from-brand/10 dark:via-gray-900 dark:to-brand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/admin" className="inline-flex items-center text-brand dark:text-brand-light hover:text-brand-dark dark:hover:text-brand mb-6 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Manage Markets</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Monitor and manage prediction markets</p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Markets</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Create New Market Button */}
              <Link href="/admin/create-market">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Create Market
                </Button>
              </Link>
            </div>
          </div>

          {/* Markets Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filteredMarkets.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No markets found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Market
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Volume
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Participants
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        End Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredMarkets.map((market) => (
                      <tr key={market.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {market.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {market.id}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {market.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(market.status)}`}>
                            {market.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(market.volume)}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                              {market.totalBets} bets
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {market.participants}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {formatDate(market.endDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleView(market.id)}
                              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="View Market"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(market.id)}
                              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Edit Market"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(market.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete Market"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Markets</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{markets.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Active Markets</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {markets.filter(m => m.status === 'active').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Volume</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(markets.reduce((sum, m) => sum + m.volume, 0))}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Participants</h3>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {markets.reduce((sum, m) => sum + m.participants, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
