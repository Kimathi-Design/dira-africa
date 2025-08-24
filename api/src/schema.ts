import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Market {
    id: ID!
    title: String!
    description: String
    category: String!
    totalVolume: Float!
    totalTrades: Int!
    endDate: String!
    isFeatured: Boolean!
    tags: [String!]!
    outcomes: [Outcome!]!
  }

  type Outcome {
    name: String!
    probability: Float!
    volume: Float!
  }

  type Query {
    markets: [Market!]!
    market(id: ID!): Market
    featuredMarkets: [Market!]!
  }

  type Mutation {
    createMarket(input: CreateMarketInput!): Market!
    placeBet(marketId: ID!, outcome: String!, amount: Float!): Bet!
  }

  input CreateMarketInput {
    title: String!
    description: String
    category: String!
    endDate: String!
    outcomes: [String!]!
    tags: [String!]
  }

  type Bet {
    id: ID!
    marketId: ID!
    outcome: String!
    amount: Float!
    potentialPayout: Float!
  }
`;
