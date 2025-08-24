'use client';

import { useState } from 'react';
import { ArrowLeft, Building2, Smartphone, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('Withdrawal request submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 dark:from-brand/10 dark:via-gray-900 dark:to-brand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Link href="/wallet" className="inline-flex items-center text-brand dark:text-brand-light hover:text-brand-dark dark:hover:text-brand mb-6 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wallet
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Withdraw Funds</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Withdraw your winnings</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Withdrawal Amount</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Amount to Withdraw
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-xl"
                />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Bank Transfer</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center">
                  <Smartphone className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Mobile Money</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Instant</div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
              className="w-full bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-teal-600 py-4 text-lg font-semibold rounded-xl"
            >
              {isProcessing ? 'Processing...' : 'Withdraw Funds'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
