'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, Users, Calendar, Tag, Share2, Bookmark, BookmarkPlus, Eye, Heart } from 'lucide-react';
import { BettingModal } from '@/components/BettingModal';
import { useMarkets } from '@/hooks/useMarkets';

interface Market {
  id: string;
  title: string;
  description?: string;
  category: string;
  totalVolume: number;
  totalTrades: number;
  endDate: string;
  isFeatured?: boolean;
  tags?: string[];
  outcomes: Array<{
    name: string;
    probability: number;
    volume: number;
  }>;
}

export default function MarketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { markets, placeBet } = useMarkets();
  const [market, setMarket] = useState<Market | null>(null);
  const [showBettingModal, setShowBettingModal] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<{name: string; probability: number; volume: number} | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (markets && params.id) {
      const foundMarket = markets.find(m => m.id === params.id);
      setMarket(foundMarket || null);
    }
  }, [markets, params.id]);

  const handleOutcomeClick = (outcome: {name: string; probability: number; volume: number}) => {
    setSelectedOutcome(outcome);
    setShowBettingModal(true);
  };

  const handlePlaceBet = async (marketId: string, outcome: string, amount: number) => {
    await placeBet(marketId, outcome, amount);
    setShowBettingModal(false);
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
      month: 'long',
      day: 'numeric',
    });
  };

  if (!market) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="btn btn-ghost"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted">Loading market details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="btn btn-ghost btn-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-outline btn-sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="btn btn-outline btn-sm"
            >
              {isBookmarked ? (
                <Bookmark className="h-4 w-4 mr-2 fill-current" />
              ) : (
                <BookmarkPlus className="h-4 w-4 mr-2" />
              )}
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Market Header */}
        <div className="card mb-8">
          <div className="card-content">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {market.category}
                  </span>
                  {market.isFeatured && (
                    <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-h1 text-foreground mb-3">
                  {market.title}
                </h1>
                <p className="text-body-lg text-muted mb-6 leading-relaxed">
                  {market.description || 'No description available'}
                </p>
              </div>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="stat-card">
                <TrendingUp className="h-6 w-6 text-success mb-2" />
                <div className="stat-number text-success">
                  {formatCurrency(market.totalVolume)}
                </div>
                <div className="stat-label">Total Volume</div>
              </div>
              <div className="stat-card">
                <Users className="h-6 w-6 text-primary mb-2" />
                <div className="stat-number text-primary">
                  {market.totalTrades.toLocaleString()}
                </div>
                <div className="stat-label">Total Trades</div>
              </div>
              <div className="stat-card">
                <Calendar className="h-6 w-6 text-secondary mb-2" />
                <div className="stat-number text-secondary">
                  {formatDate(market.endDate)}
                </div>
                <div className="stat-label">Ends</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-4 w-4 text-muted" />
              {market.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-h2 text-foreground">
              Market Outcomes
            </h2>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {market.outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => handleOutcomeClick(outcome)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-h4 text-foreground">
                      {outcome.name}
                    </h3>
                    <span className="text-h4 font-bold text-primary">
                      {(outcome.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm text-muted mb-3">
                    <span>Volume: {formatCurrency(outcome.volume)}</span>
                    <span>Trades: {Math.floor(outcome.volume / 100).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${outcome.probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Betting Modal */}
        {showBettingModal && selectedOutcome && (
          <BettingModal
            isOpen={showBettingModal}
            onClose={() => setShowBettingModal(false)}
            outcome={selectedOutcome}
            onPlaceBet={handlePlaceBet}
            market={market}
          />
        )}
      </div>
    </div>
  );
}
