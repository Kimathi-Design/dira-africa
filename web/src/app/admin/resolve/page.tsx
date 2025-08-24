'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResolvePage() {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');
  const [isResolving, setIsResolving] = useState(false);

  const marketsToResolve = [
    {
      id: '1',
      title: 'Will Kenya win AFCON 2025?',
      category: 'Sports',
      endDate: '2025-02-15',
      totalBets: 1250,
      participants: 89,
      volume: 25000,
      options: ['Yes', 'No']
    },
    {
      id: '2',
      title: 'Bitcoin price prediction for Q1 2025',
      category: 'Finance',
      endDate: '2025-03-31',
      totalBets: 890,
      participants: 156,
      volume: 45000,
      options: ['Above $50,000', 'Below $50,000']
    },
    {
      id: '3',
      title: 'Nigerian presidential election outcome',
      category: 'Politics',
      endDate: '2024-12-15',
      totalBets: 2100,
      participants: 234,
      volume: 75000,
      options: ['Candidate A', 'Candidate B', 'Candidate C']
    }
  ];

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

  const handleResolve = async () => {
    if (!selectedMarket || !selectedOutcome) return;

    setIsResolving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsResolving(false);
    alert(`Market resolved successfully! Outcome: ${selectedOutcome}`);
    
    // Reset form
    setSelectedMarket(null);
    setSelectedOutcome('');
  };

  const selectedMarketData = marketsToResolve.find(m => m.id === selectedMarket);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 dark:from-brand/10 dark:via-gray-900 dark:to-brand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/admin" className="inline-flex items-center text-brand dark:text-brand-light hover:text-brand-dark dark:hover:text-brand mb-6 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Resolve Markets</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Resolve prediction markets that have ended</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Markets List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Markets to Resolve</h2>
              
              <div className="space-y-4">
                {marketsToResolve.map((market) => (
                  <div
                    key={market.id}
                    onClick={() => setSelectedMarket(market.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedMarket === market.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {market.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {market.category}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(market.endDate)}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Volume</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(market.volume)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Bets</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {market.totalBets}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Participants</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {market.participants}
                            </p>
                          </div>
                        </div>
                      </div>
                      {selectedMarket === market.id && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Resolve Market</h2>
              
              {!selectedMarket ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a market from the list to resolve it
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Market Details */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedMarketData?.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Category: {selectedMarketData?.category} • Ended: {selectedMarketData?.endDate}
                    </p>
                  </div>

                  {/* Outcome Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Select Winning Outcome *
                    </label>
                    <div className="space-y-3">
                      {selectedMarketData?.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedOutcome(option)}
                          className={`w-full p-4 border rounded-xl text-left transition-all duration-200 ${
                            selectedOutcome === option
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {option}
                            </span>
                            {selectedOutcome === option && (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Market Stats */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Market Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-700 dark:text-blue-300">Total Volume</p>
                        <p className="font-semibold text-blue-900 dark:text-blue-100">
                          {formatCurrency(selectedMarketData?.volume || 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700 dark:text-blue-300">Total Bets</p>
                        <p className="font-semibold text-blue-900 dark:text-blue-100">
                          {selectedMarketData?.totalBets}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700 dark:text-blue-300">Participants</p>
                        <p className="font-semibold text-blue-900 dark:text-blue-100">
                          {selectedMarketData?.participants}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700 dark:text-blue-300">Options</p>
                        <p className="font-semibold text-blue-900 dark:text-blue-100">
                          {selectedMarketData?.options.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                          Important Notice
                        </h4>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Resolving a market is irreversible. All bets will be settled based on the selected outcome. 
                          Please ensure you have verified the correct result before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resolve Button */}
                  <Button
                    onClick={handleResolve}
                    disabled={!selectedOutcome || isResolving}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-4 text-lg font-semibold rounded-xl"
                  >
                    {isResolving ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Resolving Market...
                      </div>
                    ) : (
                      `Resolve Market - ${selectedOutcome}`
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
