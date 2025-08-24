'use client';

import { useState } from 'react';
import { X, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TradingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TradingModal({ isOpen, onClose }: TradingModalProps) {
  const [step, setStep] = useState<'welcome' | 'login' | 'register'>('welcome');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Start Trading on Dira
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'welcome' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to Dira
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join thousands of users making predictions on African events and earning rewards.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Join a community of African traders
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Secure, transparent blockchain technology
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Instant payouts when you win
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => setStep('login')}
                >
                  I already have an account
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setStep('register')}
                >
                  Create new account
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => {
                    onClose();
                    window.location.href = '/markets';
                  }}
                >
                  Browse markets first
                </Button>
              </div>
            </div>
          )}

          {step === 'login' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to your account to start trading
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/login" className="block">
                  <Button className="w-full">
                    Go to Login Page
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setStep('welcome')}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {step === 'register' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Join Dira
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your account and start trading in minutes
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/register" className="block">
                  <Button className="w-full">
                    Go to Registration Page
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setStep('welcome')}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
