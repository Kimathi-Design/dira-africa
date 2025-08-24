'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is Dira?",
      answer: "Dira is a prediction markets platform focused on African events, politics, sports, and other outcomes. Users can place bets on various outcomes and earn rewards based on correct predictions."
    },
    {
      question: "How do prediction markets work?",
      answer: "Prediction markets allow users to bet on the outcome of future events. If your prediction is correct, you win money. If it's wrong, you lose your bet. The odds are determined by the collective wisdom of all participants."
    },
    {
      question: "Is it legal to use Dira?",
      answer: "Dira operates in compliance with applicable laws and regulations. Users must be at least 18 years old and comply with local gambling laws in their jurisdiction."
    },
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top navigation, fill in your details, and verify your email address. You'll also need to complete KYC verification to start trading."
    },
    {
      question: "How do I deposit funds?",
      answer: "Go to your Wallet page and click 'Deposit'. We support various payment methods including bank transfers, mobile money, and cryptocurrency."
    },
    {
      question: "How do I withdraw my winnings?",
      answer: "Navigate to your Wallet page, click 'Withdraw', and select your preferred withdrawal method. Withdrawals are typically processed within 1-3 business days."
    },
    {
      question: "What is KYC verification?",
      answer: "KYC (Know Your Customer) verification is a process to verify your identity. This is required by law and helps prevent fraud and money laundering."
    },
    {
      question: "Are my funds safe?",
      answer: "Yes, we use bank-level security measures to protect your funds and personal information. All transactions are encrypted and monitored for suspicious activity."
    },
    {
      question: "What happens if a market is cancelled?",
      answer: "If a market is cancelled due to unforeseen circumstances, all bets are refunded to users' accounts. We strive to provide clear communication about any market changes."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team via email at support@dira.africa or through the contact form on our website. We typically respond within 24 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="btn btn-ghost btn-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-h1 text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Find answers to common questions about Dira Africa
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border last:border-b-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-accent transition-all duration-200 group"
                >
                  <span className="text-h4 text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-primary transition-transform" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted group-hover:text-primary transition-transform" />
                    )}
                  </div>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-body text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="card mt-8">
            <div className="card-content text-center">
              <h2 className="text-h3 text-foreground mb-4">Still have questions?</h2>
              <p className="text-body text-muted mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Contact Support
                </Link>
                <Link href="/help" className="btn btn-outline">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
