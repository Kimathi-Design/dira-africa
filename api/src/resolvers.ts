const markets = [
  {
    id: '1',
    title: 'Will Kenya win AFCON 2025?',
    description: 'Will the Kenyan national football team win the 2025 Africa Cup of Nations?',
    category: 'FOOTBALL',
    totalVolume: 43000,
    totalTrades: 1250,
    endDate: '2025-02-15',
    isFeatured: true,
    tags: ['football', 'afcon', 'kenya', 'sports'],
    outcomes: [
      { name: 'YES', probability: 0.35, volume: 15000 },
      { name: 'NO', probability: 0.65, volume: 28000 }
    ]
  },
  {
    id: '2',
    title: 'Who will win the 2024 Nigerian Presidential Election?',
    description: 'Predict the winner of the upcoming Nigerian presidential election',
    category: 'ELECTIONS',
    totalVolume: 57000,
    totalTrades: 890,
    endDate: '2024-12-31',
    isFeatured: true,
    tags: ['nigeria', 'elections', 'politics', 'president'],
    outcomes: [
      { name: 'Bola Tinubu', probability: 0.45, volume: 25000 },
      { name: 'Peter Obi', probability: 0.35, volume: 20000 },
      { name: 'Atiku Abubakar', probability: 0.20, volume: 12000 }
    ]
  },
  {
    id: '3',
    title: 'Will Bitcoin reach $100,000 by end of 2024?',
    description: 'Will Bitcoin price reach or exceed $100,000 USD by December 31, 2024?',
    category: 'CRYPTO',
    totalVolume: 72000,
    totalTrades: 2100,
    endDate: '2024-12-31',
    tags: ['bitcoin', 'crypto', 'price', 'trading'],
    outcomes: [
      { name: 'YES', probability: 0.25, volume: 18000 },
      { name: 'NO', probability: 0.75, volume: 54000 }
    ]
  }
];

export const resolvers = {
  Query: {
    markets: () => markets,
    market: (_: any, { id }: { id: string }) => markets.find(m => m.id === id),
    featuredMarkets: () => markets.filter(m => m.isFeatured)
  },
  
  Mutation: {
    createMarket: (_: any, { input }: { input: any }) => {
      const newMarket = {
        id: (markets.length + 1).toString(),
        ...input,
        totalVolume: 0,
        totalTrades: 0,
        isFeatured: false,
        outcomes: input.outcomes.map((outcome: string) => ({
          name: outcome,
          probability: 0.5,
          volume: 0
        }))
      };
      markets.push(newMarket);
      return newMarket;
    },
    
    placeBet: (_: any, { marketId, outcome, amount }: { marketId: string, outcome: string, amount: number }) => {
      const market = markets.find(m => m.id === marketId);
      if (!market) {
        throw new Error('Market not found');
      }
      
      const outcomeData = market.outcomes.find(o => o.name === outcome);
      if (!outcomeData) {
        throw new Error('Outcome not found');
      }
      
      // Simple payout calculation
      const potentialPayout = amount / outcomeData.probability;
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        marketId,
        outcome,
        amount,
        potentialPayout
      };
    }
  }
};
