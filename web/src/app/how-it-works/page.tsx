'use client';

import { ArrowLeft, TrendingUp, Users, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
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
          <h1 className="text-h1 text-foreground mb-4">How It Works</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Learn how prediction markets work and start trading on African events
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* What are Prediction Markets */}
          <div className="card mb-8">
            <div className="card-content">
              <h2 className="text-h2 text-foreground mb-4">
                What are Prediction Markets?
              </h2>
              <p className="text-body text-muted mb-4">
                Prediction markets allow you to bet on the outcome of future events. If your prediction is correct, 
                you win money. If it's wrong, you lose your bet.
              </p>
              <p className="text-body text-muted">
                The odds are determined by the collective wisdom of all participants in the market.
              </p>
            </div>
          </div>

          {/* How it Works Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <div className="card-content">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-h4 text-foreground mb-2">Choose a Market</h3>
                <p className="text-body-sm text-muted">
                  Browse markets covering African events, politics, sports, and more.
                </p>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-content">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-h4 text-foreground mb-2">Place Your Bet</h3>
                <p className="text-body-sm text-muted">
                  Select an outcome and bet your money. See potential winnings instantly.
                </p>
              </div>
            </div>
            <div className="card text-center">
              <div className="card-content">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-h4 text-foreground mb-2">Get Paid</h3>
                <p className="text-body-sm text-muted">
                  If your prediction is correct, you automatically receive your winnings.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="card mb-8">
            <div className="card-header">
              <h2 className="text-h2 text-foreground">Why Choose Dira Africa?</h2>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 text-foreground mb-1">African Focus</h3>
                    <p className="text-body-sm text-muted">
                      Markets specifically designed for African events, politics, and culture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 text-foreground mb-1">Secure Platform</h3>
                    <p className="text-body-sm text-muted">
                      Bank-level security to protect your funds and personal information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 text-foreground mb-1">Mobile First</h3>
                    <p className="text-body-sm text-muted">
                      Optimized for mobile devices, trade anywhere, anytime.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 text-foreground mb-1">Local Payments</h3>
                    <p className="text-body-sm text-muted">
                      Support for local payment methods including mobile money.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Trading Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
