'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Calendar, DollarSign, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CreateMarketPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    endDate: '',
    initialAmount: '',
    options: ['', '']
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Politics',
    'Sports',
    'Technology',
    'Finance',
    'Entertainment',
    'Weather',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('Market created successfully!');
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Create New Market</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Set up a new prediction market</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Market Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Will Kenya win AFCON 2025?"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="form-select"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="FOOTBALL">Football</option>
                      <option value="ELECTIONS">Elections</option>
                      <option value="ENTERTAINMENT">Entertainment</option>
                      <option value="TECHNOLOGY">Technology</option>
                      <option value="ECONOMY">Economy</option>
                      <option value="POLITICS">Politics</option>
                      <option value="OLYMPICS">Olympics</option>
                      <option value="HEALTH">Health</option>
                      <option value="ENVIRONMENT">Environment</option>
                      <option value="EDUCATION">Education</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide a detailed description of the prediction market..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Market Settings */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      End Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Initial Pool Amount *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        min="100"
                        value={formData.initialAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, initialAmount: e.target.value }))}
                        placeholder="1000"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Outcome Options */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Outcome Options</h2>
                
                <div className="space-y-4">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Option {index + 1} *
                        </label>
                        <input
                          type="text"
                          required
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      {formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="mt-6 px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    onClick={addOption}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Option</span>
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-semibold rounded-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Market...
                    </div>
                  ) : (
                    'Create Market'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
