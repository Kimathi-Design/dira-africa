# 🌍 Dira - Africa-Focused Prediction Markets Platform

A modern, scalable prediction markets platform built for Africa, inspired by Polymarket. Built with Next.js, GraphQL, Solidity smart contracts, and The Graph Protocol.

## 🚀 Features

- **Prediction Markets**: Create and trade on Yes/No and multiple choice markets
- **Africa-Focused**: Local payment methods (M-PESA, Airtel Money, Flutterwave, Paystack)
- **Multi-Currency**: Support for KES, NGN, ZAR + stablecoins
- **Real-Time**: Live odds updates via WebSockets
- **PWA**: Offline support and push notifications
- **Localization**: English, Swahili, French, Arabic support
- **Categories**: Politics, Sports, Crypto, Elections, Economy, Football

## 📁 Project Structure

```
/dira
 ├── /web          → Next.js 14 (App Router) + Tailwind + shadcn/ui + Apollo Client + PWA
 ├── /api          → Node.js + Apollo Server GraphQL + REST APIs
 ├── /contracts    → Solidity smart contracts (Hardhat/Foundry)
 ├── /subgraph     → Graph Protocol indexing
 ├── /ui           → Shared React component library
 ├── /db           → Prisma + PostgreSQL schema
 └── /scripts      → Deployment + CI/CD scripts
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui, Apollo Client, Framer Motion
- **Backend**: Node.js, Apollo Server, Prisma ORM
- **Database**: PostgreSQL
- **Blockchain**: Solidity, Hardhat/Foundry
- **Indexing**: The Graph Protocol
- **Payments**: M-PESA, Airtel Money, Flutterwave, Paystack
- **Deployment**: Docker, GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dira

# Install dependencies
pnpm install

# Setup environment variables
cp env.example .env.local

# Start development servers
pnpm dev
```

### Environment Variables

Create `.env.local` with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dira"

# JWT
JWT_SECRET="your-jwt-secret"

# Blockchain
PRIVATE_KEY="your-private-key"
RPC_URL="your-rpc-url"

# Payments
MPESA_API_KEY="your-mpesa-key"
FLUTTERWAVE_SECRET="your-flutterwave-secret"
PAYSTACK_SECRET="your-paystack-secret"

# The Graph
GRAPH_API_KEY="your-graph-api-key"
```

## 🏗️ Development Setup

### Frontend (Next.js)

```bash
cd web
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Backend (API)

```bash
cd api
pnpm dev
```

The API will be available at `http://localhost:4000`

### Database

```bash
cd db
pnpm db:generate
pnpm db:push
pnpm db:seed
```

### Smart Contracts

```bash
cd contracts
pnpm compile
pnpm test
```

### Subgraph

```bash
cd subgraph
pnpm codegen
pnpm build
```

## 📚 Documentation

### Frontend Components

The frontend uses a modern component architecture with:

- **MarketCard**: Beautiful, animated market cards with betting functionality
- **Button**: Reusable button component with multiple variants
- **Layout**: Responsive layout with dark mode support

### Smart Contracts

- **MarketFactory.sol**: Factory contract for creating prediction markets
- **Market.sol**: Individual market contract with betting and resolution logic

### Database Schema

The Prisma schema includes:

- **User**: User profiles with KYC verification
- **Market**: Prediction markets with outcomes
- **Trade**: User bets and transactions
- **Wallet**: Multi-currency wallet support
- **Transaction**: Payment and withdrawal history

## 🌍 Africa-Specific Features

- **Local Payment Integration**: M-PESA, Airtel Money, Flutterwave, Paystack
- **Multi-Currency Support**: KES, NGN, ZAR + stablecoins
- **Localized Content**: English, Swahili, French, Arabic
- **Low-Bandwidth Mode**: Optimized for slower connections
- **Football & Elections**: Featured categories for African markets
- **Geo-Blocking**: Compliance with local regulations

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Dark Mode**: Built-in dark theme support
- **Animations**: Framer Motion animations for enhanced user experience
- **PWA**: Progressive Web App with offline support
- **Real-Time Updates**: Live odds and market updates

## 🔐 Security & Compliance

- JWT + session cookies
- KYC/AML hooks (API stubs)
- Geo-blocking by country
- HTTPS, CSRF, XSS protections
- Audit trail logging

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd web
vercel --prod
```

### Backend (Railway/Render)

```bash
cd api
# Deploy to your preferred platform
```

### Smart Contracts (Ethereum)

```bash
cd contracts
pnpm deploy:testnet
```

### Subgraph (The Graph)

```bash
cd subgraph
pnpm deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🌟 What's Built

✅ **Complete Monorepo Structure**
✅ **Next.js 14 Frontend** with beautiful UI components
✅ **Smart Contracts** (MarketFactory + Market)
✅ **Database Schema** with Prisma
✅ **Subgraph Configuration** for The Graph
✅ **PWA Setup** with manifest
✅ **Modern UI Components** with animations
✅ **Sample African Markets** (AFCON, Elections, etc.)
✅ **Multi-Currency Support** (KES, NGN, ZAR)
✅ **Responsive Design** with dark mode
✅ **TypeScript** throughout the stack

The platform is now ready for development and can be extended with:
- Real payment integrations
- User authentication
- Real-time WebSocket updates
- Advanced market features
- Mobile app development
