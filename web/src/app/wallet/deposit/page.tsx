'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Building2, Smartphone, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'M-Pesa, Airtel Money, MTN Mobile Money'
    }
  ];

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 dark:from-brand/10 dark:via-gray-900 dark:to-brand/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Deposit Successful!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your deposit of {formatCurrency(amount)} has been processed successfully.
              </p>
              <div className="space-y-3">
                <Link href="/wallet">
                  <Button className="w-full bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-teal-600">
                    Back to Wallet
                  </Button>
                </Link>
                <Link href="/markets">
                  <Button variant="outline" className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand hover:text-brand dark:hover:border-brand-light dark:hover:text-brand-light">
                    Start Trading
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand/5 via-white to-brand/5 dark:from-brand/10 dark:via-gray-900 dark:to-brand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/wallet" className="inline-flex items-center text-brand dark:text-brand-light hover:text-brand-dark dark:hover:text-brand mb-6 transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Wallet
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Deposit Funds</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Add funds to your wallet to start trading on prediction markets
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Amount Input */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Enter Amount</h2>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-blue-200" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-2xl font-bold"
                />
              </div>
              {amount && (
                <p className="text-blue-100 mt-2">
                  You will receive: {formatCurrency(amount)}
                </p>
              )}
            </div>

            {/* Payment Methods */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Select Payment Method
              </h3>
              
              <div className="space-y-4 mb-8">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 border rounded-xl text-left transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                        selectedMethod === method.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {method.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Deposit Button */}
              <Button
                onClick={handleDeposit}
                disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold rounded-xl"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Deposit ${amount ? formatCurrency(amount) : '$0.00'}`
                )}
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
