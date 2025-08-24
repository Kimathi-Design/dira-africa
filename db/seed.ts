import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌍 Seeding Dira database with African prediction markets...')

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: 'admin@dira.africa' },
    update: {},
    create: {
      email: 'admin@dira.africa',
      username: 'dira_admin',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1m', // password123
      firstName: 'Dira',
      lastName: 'Admin',
      isVerified: true,
      isKycVerified: true,
      kycStatus: 'APPROVED',
      country: 'Kenya',
      city: 'Nairobi'
    },
  })

  // Create sample markets
  const markets = [
    {
      title: 'Will Kenya win AFCON 2025?',
      description: 'Will the Kenyan national football team win the 2025 Africa Cup of Nations?',
      category: 'FOOTBALL',
      type: 'YES_NO',
      endDate: new Date('2025-02-15'),
      isFeatured: true,
      tags: ['football', 'afcon', 'kenya', 'sports'],
      outcomes: [
        { name: 'YES', probability: 0.35, volume: 15000 },
        { name: 'NO', probability: 0.65, volume: 28000 }
      ]
    },
    {
      title: 'Who will win the 2024 Nigerian Presidential Election?',
      description: 'Predict the winner of the upcoming Nigerian presidential election',
      category: 'ELECTIONS',
      type: 'MULTIPLE_CHOICE',
      endDate: new Date('2024-12-31'),
      isFeatured: true,
      tags: ['nigeria', 'elections', 'politics', 'president'],
      outcomes: [
        { name: 'Bola Tinubu', probability: 0.45, volume: 25000 },
        { name: 'Peter Obi', probability: 0.35, volume: 20000 },
        { name: 'Atiku Abubakar', probability: 0.20, volume: 12000 }
      ]
    },
    {
      title: 'Will Bitcoin reach $100,000 by end of 2024?',
      description: 'Will Bitcoin price reach or exceed $100,000 USD by December 31, 2024?',
      category: 'CRYPTO',
      type: 'YES_NO',
      endDate: new Date('2024-12-31'),
      tags: ['bitcoin', 'crypto', 'price', 'trading'],
      outcomes: [
        { name: 'YES', probability: 0.25, volume: 18000 },
        { name: 'NO', probability: 0.75, volume: 54000 }
      ]
    },
    {
      title: 'Will South Africa host the 2030 FIFA World Cup?',
      description: 'Will South Africa be selected as a host nation for the 2030 FIFA World Cup?',
      category: 'SPORTS',
      type: 'YES_NO',
      endDate: new Date('2025-06-30'),
      tags: ['south africa', 'fifa', 'world cup', 'football'],
      outcomes: [
        { name: 'YES', probability: 0.15, volume: 8000 },
        { name: 'NO', probability: 0.85, volume: 45000 }
      ]
    },
    {
      title: 'Will the Kenyan Shilling strengthen against USD in 2024?',
      description: 'Will the Kenyan Shilling (KES) strengthen against the US Dollar (USD) by end of 2024?',
      category: 'ECONOMY',
      type: 'YES_NO',
      endDate: new Date('2024-12-31'),
      tags: ['kenya', 'currency', 'economy', 'forex'],
      outcomes: [
        { name: 'YES', probability: 0.30, volume: 12000 },
        { name: 'NO', probability: 0.70, volume: 28000 }
      ]
    },
    {
      title: 'Will Ghana qualify for the 2026 World Cup?',
      description: 'Will Ghana qualify for the 2026 FIFA World Cup in North America?',
      category: 'FOOTBALL',
      type: 'YES_NO',
      endDate: new Date('2025-11-30'),
      tags: ['ghana', 'world cup', 'football', 'qualification'],
      outcomes: [
        { name: 'YES', probability: 0.40, volume: 16000 },
        { name: 'NO', probability: 0.60, volume: 24000 }
      ]
    }
  ]

  for (const marketData of markets) {
    const { outcomes, ...marketInfo } = marketData
    
    const market = await prisma.market.create({
      data: {
        ...marketInfo,
        createdBy: user.id,
        outcomes: {
          create: outcomes
        }
      }
    })

    console.log(`✅ Created market: ${market.title}`)
  }

  // Create sample wallets
  await prisma.wallet.createMany({
    data: [
      { userId: user.id, currency: 'USD', balance: 1000 },
      { userId: user.id, currency: 'KES', balance: 150000 },
      { userId: user.id, currency: 'NGN', balance: 500000 },
      { userId: user.id, currency: 'ZAR', balance: 20000 },
      { userId: user.id, currency: 'USDC', balance: 500 }
    ],
    skipDuplicates: true
  })

  console.log('✅ Created sample wallets')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
