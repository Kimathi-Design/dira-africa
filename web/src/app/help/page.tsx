'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, BookOpen, MessageSquare, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([])

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      faqs: [
        {
          id: 1,
          question: 'How do I create an account?',
          answer: 'To create an account, click the "Sign Up" button in the top navigation. Fill in your details including name, email, phone number, and create a strong password. You\'ll need to verify your email address to complete the registration.'
        },
        {
          id: 2,
          question: 'How do I deposit funds into my wallet?',
          answer: 'Navigate to your Wallet page and click "Deposit". You can choose from multiple payment methods including bank transfer, mobile money (M-Pesa, Airtel Money), or credit/debit cards. Follow the instructions to complete your deposit.'
        },
        {
          id: 3,
          question: 'What is the minimum deposit amount?',
          answer: 'The minimum deposit amount is $10 USD or equivalent in your local currency. This helps ensure that all users can participate in prediction markets regardless of their budget.'
        }
      ]
    },
    {
      id: 'trading',
      title: 'Trading & Markets',
      icon: MessageSquare,
      faqs: [
        {
          id: 4,
          question: 'How do prediction markets work?',
          answer: 'Prediction markets allow you to trade on the outcome of future events. You can buy "shares" in outcomes you think are likely to happen. If you\'re correct, your shares increase in value and you can sell them for a profit.'
        },
        {
          id: 5,
          question: 'What types of markets are available?',
          answer: 'We offer markets across various categories including politics, sports, economy, business, and technology. All markets are focused on African events and developments, making them relevant to our users.'
        },
        {
          id: 6,
          question: 'How do I place a bet on a market?',
          answer: 'Browse available markets, select one that interests you, and click "View Market". You\'ll see the different outcomes and their current probabilities. Click on an outcome to place your bet and enter the amount you want to invest.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account & Security',
      icon: Phone,
      faqs: [
        {
          id: 7,
          question: 'How do I reset my password?',
          answer: 'If you\'ve forgotten your password, click "Forgot Password" on the login page. Enter your email address and we\'ll send you a link to reset your password. Make sure to check your spam folder if you don\'t receive the email.'
        },
        {
          id: 8,
          question: 'Is my personal information secure?',
          answer: 'Yes, we take security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent. We also offer two-factor authentication for additional security.'
        },
        {
          id: 9,
          question: 'How do I update my profile information?',
          answer: 'Go to your Profile page from the main navigation. You can update your personal information, change your password, and manage your notification preferences. Some changes may require verification for security purposes.'
        }
      ]
    }
  ]

  const toggleFaq = (faqId: number) => {
    setExpandedFaqs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    )
  }

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0)

  return (
    <div>
      {/* Header */}
      <section className="py-8 bg-card">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 mb-2">Help Center</h1>
              <p className="text-body-lg text-muted">
                Find answers to common questions and get support
              </p>
            </div>
            <Link href="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container">
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-h2 mb-4">Search Results</h2>
              <p className="text-body text-muted">
                Found {filteredFaqs.reduce((acc, cat) => acc + cat.faqs.length, 0)} results for "{searchQuery}"
              </p>
            </div>
          )}

          <div className="space-y-12">
            {filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="h-6 w-6 text-primary" />
                  <h2 className="text-h2">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq) => (
                    <div key={faq.id} className="card">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-6 hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-h4 font-medium">{faq.question}</h3>
                          {expandedFaqs.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-muted" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted" />
                          )}
                        </div>
                      </button>
                      
                      {expandedFaqs.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <p className="text-body text-muted leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {searchQuery && filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted mx-auto mb-4" />
              <h3 className="text-h3 mb-2">No results found</h3>
              <p className="text-body text-muted mb-6">
                Try searching with different keywords or browse our categories below
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-outline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 mb-4">Still need help?</h2>
            <p className="text-body-lg text-muted mb-8">
              Our support team is here to help you with any questions or issues
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="card-content">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-h4 mb-2">Email Support</h3>
                  <p className="text-body text-muted mb-4">
                    Get help via email within 24 hours
                  </p>
                  <a
                    href="mailto:support@dira.africa"
                    className="btn btn-outline w-full"
                  >
                    Send Email
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-h4 mb-2">Phone Support</h3>
                  <p className="text-body text-muted mb-4">
                    Call us during business hours
                  </p>
                  <a
                    href="tel:+254700123456"
                    className="btn btn-outline w-full"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-h4 mb-2">Live Chat</h3>
                  <p className="text-body text-muted mb-4">
                    Chat with our support team
                  </p>
                  <Link href="/contact" className="btn btn-outline w-full">
                    Start Chat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
