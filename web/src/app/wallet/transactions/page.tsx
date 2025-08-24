'use client';

import { useState } from 'react';
import { ArrowLeft, Download, Upload, TrendingUp, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 500,
      description: 'Bank transfer',
      date: '2024-01-15',
      status: 'completed',
      reference: 'TXN-001'
    },
    {
      id: '2',
      type: 'bet',
      amount: -25,
      description: 'Bet on Kenya AFCON 2025',
      date: '2024-01-14',
      status: 'completed',
      reference: 'TXN-002'
    },
    {
      id: '3',
      type: 'win',
      amount: 75,
      description: 'Won bet on Bitcoin prediction',
      date: '2024-01-13',
      status: 'completed',
      reference: 'TXN-003'
    },
    {
      id: '4',
      type: 'withdrawal',
      amount: -200,
      description: 'Withdrawal to bank',
      date: '2024-01-12',
      status: 'pending',
      reference: 'TXN-004'
    },
    {
      id: '5',
      type: 'deposit',
      amount: 1000,
      description: 'Credit card payment',
      date: '2024-01-10',
      status: 'completed',
      reference: 'TXN-005'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Download className="h-4 w-4 text-green-600" />;
      case 'withdrawal':
        return <Upload className="h-4 w-4 text-red-600" />;
      case 'bet':
      case 'win':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 dark:from-brand/10 dark:via-gray-900 dark:to-brand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/wallet" className="inline-flex items-center text-brand dark:text-brand-light hover:text-brand-dark dark:hover:text-brand mb-6 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wallet
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Transaction History</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">View all your wallet transactions</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
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
                  <option value="all">All Transactions</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="bet">Bets</option>
                  <option value="win">Winnings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No transactions found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {transaction.description}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(transaction.date)} • {transaction.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${
                          transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Deposits</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0))}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Withdrawals</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(Math.abs(transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0)))}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Net Balance</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(transactions.reduce((sum, t) => sum + t.amount, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
