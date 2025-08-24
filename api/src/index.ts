import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:3002', 'http://127.0.0.1:3003'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dira API is running' });
});

// Comprehensive markets data with 25 African-focused markets
let markets = [
  // Featured Markets
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
    title: 'Will Nigeria qualify for World Cup 2026?',
    description: 'Will the Nigerian Super Eagles qualify for the 2026 FIFA World Cup?',
    category: 'FOOTBALL',
    totalVolume: 38000,
    totalTrades: 1100,
    endDate: '2025-06-30',
    isFeatured: true,
    tags: ['football', 'world-cup', 'nigeria', 'qualification'],
    outcomes: [
      { name: 'YES', probability: 0.60, volume: 22000 },
      { name: 'NO', probability: 0.40, volume: 16000 }
    ]
  },
  {
    id: '4',
    title: 'Will South Africa host the 2030 World Cup?',
    description: 'Will South Africa be selected as a host nation for the 2030 FIFA World Cup?',
    category: 'FOOTBALL',
    totalVolume: 29000,
    totalTrades: 750,
    endDate: '2025-12-31',
    isFeatured: true,
    tags: ['football', 'world-cup', 'south-africa', 'hosting'],
    outcomes: [
      { name: 'YES', probability: 0.25, volume: 7000 },
      { name: 'NO', probability: 0.75, volume: 22000 }
    ]
  },

  // Sports Markets
  {
    id: '5',
    title: 'Will Egypt win the 2024 Olympic gold in football?',
    description: 'Will Egypt win the gold medal in football at the 2024 Paris Olympics?',
    category: 'FOOTBALL',
    totalVolume: 22000,
    totalTrades: 650,
    endDate: '2024-08-10',
    tags: ['football', 'olympics', 'egypt', 'gold-medal'],
    outcomes: [
      { name: 'YES', probability: 0.30, volume: 6500 },
      { name: 'NO', probability: 0.70, volume: 15500 }
    ]
  },
  {
    id: '6',
    title: 'Will Morocco reach the 2026 World Cup semi-finals?',
    description: 'Will Morocco advance to the semi-finals of the 2026 FIFA World Cup?',
    category: 'FOOTBALL',
    totalVolume: 18000,
    totalTrades: 520,
    endDate: '2026-07-15',
    tags: ['football', 'world-cup', 'morocco', 'semi-finals'],
    outcomes: [
      { name: 'YES', probability: 0.20, volume: 3600 },
      { name: 'NO', probability: 0.80, volume: 14400 }
    ]
  },
  {
    id: '7',
    title: 'Will Kenya win any medal at 2024 Paris Olympics?',
    description: 'Will Kenya win at least one medal in any sport at the 2024 Paris Olympics?',
    category: 'OLYMPICS',
    totalVolume: 15000,
    totalTrades: 420,
    endDate: '2024-08-11',
    tags: ['olympics', 'kenya', 'medals', 'track'],
    outcomes: [
      { name: 'YES', probability: 0.85, volume: 12750 },
      { name: 'NO', probability: 0.15, volume: 2250 }
    ]
  },

  // Political Markets
  {
    id: '8',
    title: 'Will Ghana have a peaceful election in 2024?',
    description: 'Will Ghana\'s 2024 presidential election be conducted without major violence?',
    category: 'ELECTIONS',
    totalVolume: 25000,
    totalTrades: 680,
    endDate: '2024-12-07',
    tags: ['ghana', 'elections', 'politics', 'peace'],
    outcomes: [
      { name: 'YES', probability: 0.75, volume: 18750 },
      { name: 'NO', probability: 0.25, volume: 6250 }
    ]
  },
  {
    id: '9',
    title: 'Will South Africa\'s ANC lose majority in 2024?',
    description: 'Will the African National Congress lose its parliamentary majority in 2024?',
    category: 'ELECTIONS',
    totalVolume: 32000,
    totalTrades: 890,
    endDate: '2024-05-29',
    tags: ['south-africa', 'anc', 'elections', 'politics'],
    outcomes: [
      { name: 'YES', probability: 0.40, volume: 12800 },
      { name: 'NO', probability: 0.60, volume: 19200 }
    ]
  },
  {
    id: '10',
    title: 'Will Ethiopia sign peace deal with Tigray in 2024?',
    description: 'Will Ethiopia sign a comprehensive peace agreement with Tigray region in 2024?',
    category: 'POLITICS',
    totalVolume: 18000,
    totalTrades: 450,
    endDate: '2024-12-31',
    tags: ['ethiopia', 'tigray', 'peace', 'conflict'],
    outcomes: [
      { name: 'YES', probability: 0.65, volume: 11700 },
      { name: 'NO', probability: 0.35, volume: 6300 }
    ]
  },

  // Entertainment Markets
  {
    id: '11',
    title: 'Will Burna Boy win Grammy 2025?',
    description: 'Will Burna Boy win a Grammy Award in 2025?',
    category: 'ENTERTAINMENT',
    totalVolume: 28000,
    totalTrades: 780,
    endDate: '2025-02-09',
    tags: ['burna-boy', 'grammy', 'music', 'nigeria'],
    outcomes: [
      { name: 'YES', probability: 0.35, volume: 9800 },
      { name: 'NO', probability: 0.65, volume: 18200 }
    ]
  },
  {
    id: '12',
    title: 'Will Nollywood film win Oscar 2025?',
    description: 'Will a Nigerian film win an Academy Award in 2025?',
    category: 'ENTERTAINMENT',
    totalVolume: 12000,
    totalTrades: 340,
    endDate: '2025-03-02',
    tags: ['nollywood', 'oscar', 'film', 'nigeria'],
    outcomes: [
      { name: 'YES', probability: 0.15, volume: 1800 },
      { name: 'NO', probability: 0.85, volume: 10200 }
    ]
  },
  {
    id: '13',
    title: 'Will Wizkid release album in 2024?',
    description: 'Will Wizkid release a new studio album in 2024?',
    category: 'ENTERTAINMENT',
    totalVolume: 16000,
    totalTrades: 480,
    endDate: '2024-12-31',
    tags: ['wizkid', 'music', 'album', 'nigeria'],
    outcomes: [
      { name: 'YES', probability: 0.70, volume: 11200 },
      { name: 'NO', probability: 0.30, volume: 4800 }
    ]
  },

  // Technology Markets
  {
    id: '14',
    title: 'Will Flutterwave IPO in 2024?',
    description: 'Will Flutterwave go public with an IPO in 2024?',
    category: 'TECHNOLOGY',
    totalVolume: 35000,
    totalTrades: 920,
    endDate: '2024-12-31',
    tags: ['flutterwave', 'ipo', 'fintech', 'nigeria'],
    outcomes: [
      { name: 'YES', probability: 0.25, volume: 8750 },
      { name: 'NO', probability: 0.75, volume: 26250 }
    ]
  },
  {
    id: '15',
    title: 'Will Jumia become profitable in 2024?',
    description: 'Will Jumia report positive net income for 2024?',
    category: 'TECHNOLOGY',
    totalVolume: 22000,
    totalTrades: 580,
    endDate: '2025-02-28',
    tags: ['jumia', 'profitability', 'ecommerce', 'africa'],
    outcomes: [
      { name: 'YES', probability: 0.40, volume: 8800 },
      { name: 'NO', probability: 0.60, volume: 13200 }
    ]
  },
  {
    id: '16',
    title: 'Will 5G coverage reach 50% of major African cities?',
    description: 'Will 5G network coverage reach 50% of major African cities by end of 2024?',
    category: 'TECHNOLOGY',
    totalVolume: 19000,
    totalTrades: 520,
    endDate: '2024-12-31',
    tags: ['5g', 'telecom', 'africa', 'technology'],
    outcomes: [
      { name: 'YES', probability: 0.30, volume: 5700 },
      { name: 'NO', probability: 0.70, volume: 13300 }
    ]
  },

  // Economic Markets
  {
    id: '17',
    title: 'Will Nigeria\'s Naira strengthen against USD in 2024?',
    description: 'Will the Nigerian Naira strengthen against the US Dollar by end of 2024?',
    category: 'ECONOMY',
    totalVolume: 45000,
    totalTrades: 1200,
    endDate: '2024-12-31',
    tags: ['nigeria', 'naira', 'currency', 'economy'],
    outcomes: [
      { name: 'YES', probability: 0.35, volume: 15750 },
      { name: 'NO', probability: 0.65, volume: 29250 }
    ]
  },
  {
    id: '18',
    title: 'Will South Africa avoid recession in 2024?',
    description: 'Will South Africa avoid a technical recession (2 consecutive quarters of negative growth) in 2024?',
    category: 'ECONOMY',
    totalVolume: 38000,
    totalTrades: 980,
    endDate: '2024-12-31',
    tags: ['south-africa', 'recession', 'economy', 'gdp'],
    outcomes: [
      { name: 'YES', probability: 0.60, volume: 22800 },
      { name: 'NO', probability: 0.40, volume: 15200 }
    ]
  },
  {
    id: '19',
    title: 'Will Kenya\'s inflation drop below 5% in 2024?',
    description: 'Will Kenya\'s annual inflation rate drop below 5% at any point in 2024?',
    category: 'ECONOMY',
    totalVolume: 26000,
    totalTrades: 720,
    endDate: '2024-12-31',
    tags: ['kenya', 'inflation', 'economy', 'cpi'],
    outcomes: [
      { name: 'YES', probability: 0.45, volume: 11700 },
      { name: 'NO', probability: 0.55, volume: 14300 }
    ]
  },

  // Health & Environment
  {
    id: '20',
    title: 'Will Africa achieve 70% COVID vaccination by 2024?',
    description: 'Will Africa achieve 70% COVID-19 vaccination rate by end of 2024?',
    category: 'HEALTH',
    totalVolume: 15000,
    totalTrades: 420,
    endDate: '2024-12-31',
    tags: ['covid', 'vaccination', 'health', 'africa'],
    outcomes: [
      { name: 'YES', probability: 0.55, volume: 8250 },
      { name: 'NO', probability: 0.45, volume: 6750 }
    ]
  },
  {
    id: '21',
    title: 'Will Lake Victoria water level rise in 2024?',
    description: 'Will Lake Victoria\'s water level rise significantly in 2024 compared to 2023?',
    category: 'ENVIRONMENT',
    totalVolume: 8000,
    totalTrades: 220,
    endDate: '2024-12-31',
    tags: ['lake-victoria', 'environment', 'climate', 'water'],
    outcomes: [
      { name: 'YES', probability: 0.65, volume: 5200 },
      { name: 'NO', probability: 0.35, volume: 2800 }
    ]
  },
  {
    id: '22',
    title: 'Will Kenya ban single-use plastics in 2024?',
    description: 'Will Kenya implement a nationwide ban on single-use plastics in 2024?',
    category: 'ENVIRONMENT',
    totalVolume: 12000,
    totalTrades: 350,
    endDate: '2024-12-31',
    tags: ['kenya', 'plastic-ban', 'environment', 'policy'],
    outcomes: [
      { name: 'YES', probability: 0.40, volume: 4800 },
      { name: 'NO', probability: 0.60, volume: 7200 }
    ]
  },

  // Education & Innovation
  {
    id: '23',
    title: 'Will African university rank in top 100 globally?',
    description: 'Will any African university rank in the top 100 of QS World University Rankings 2025?',
    category: 'EDUCATION',
    totalVolume: 10000,
    totalTrades: 280,
    endDate: '2025-06-30',
    tags: ['education', 'university', 'ranking', 'africa'],
    outcomes: [
      { name: 'YES', probability: 0.25, volume: 2500 },
      { name: 'NO', probability: 0.75, volume: 7500 }
    ]
  },
  {
    id: '24',
    title: 'Will Kenya launch satellite in 2024?',
    description: 'Will Kenya successfully launch its own satellite into orbit in 2024?',
    category: 'TECHNOLOGY',
    totalVolume: 18000,
    totalTrades: 480,
    endDate: '2024-12-31',
    tags: ['kenya', 'satellite', 'space', 'technology'],
    outcomes: [
      { name: 'YES', probability: 0.30, volume: 5400 },
      { name: 'NO', probability: 0.70, volume: 12600 }
    ]
  },
  {
    id: '25',
    title: 'Will Nigeria approve cryptocurrency regulations?',
    description: 'Will Nigeria approve comprehensive cryptocurrency regulations in 2024?',
    category: 'TECHNOLOGY',
    totalVolume: 32000,
    totalTrades: 850,
    endDate: '2024-12-31',
    tags: ['nigeria', 'cryptocurrency', 'regulation', 'fintech'],
    outcomes: [
      { name: 'YES', probability: 0.50, volume: 16000 },
      { name: 'NO', probability: 0.50, volume: 16000 }
    ]
  }
];

// Sample markets endpoint
app.get('/api/markets', (req, res) => {
  res.json(markets);
});

// Place bet endpoint
app.post('/api/bets', (req, res) => {
  try {
    const { marketId, outcome, amount, userId } = req.body;
    
    if (!marketId || !outcome || !amount || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the market
    const market = markets.find(m => m.id === marketId);
    if (!market) {
      return res.status(404).json({ error: 'Market not found' });
    }

    // Find the outcome
    const outcomeData = market.outcomes.find(o => o.name === outcome);
    if (!outcomeData) {
      return res.status(404).json({ error: 'Outcome not found' });
    }

    // Update market data (in real app, this would update the database)
    market.totalVolume += amount;
    market.totalTrades += 1;
    outcomeData.volume += amount;

    // Recalculate probabilities (simple implementation)
    const totalVolume = market.outcomes.reduce((sum, o) => sum + o.volume, 0);
    market.outcomes.forEach(o => {
      o.probability = o.volume / totalVolume;
    });

    console.log(`Bet placed: $${amount} on ${outcome} for market ${marketId} by user ${userId}`);

    res.json({
      success: true,
      bet: {
        id: Date.now().toString(),
        marketId,
        outcome,
        amount,
        userId,
        timestamp: new Date().toISOString()
      },
      updatedMarket: market
    });
  } catch (error) {
    console.error('Error placing bet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    // Add context here (user, database connection, etc.)
  }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 Dira API server running on http://localhost:${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  });
}

startServer().catch(console.error);
