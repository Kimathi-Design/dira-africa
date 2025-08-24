'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, BookOpen, Download, Copy, Check, ExternalLink, Zap, Database, Shield, Globe } from 'lucide-react';

const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/markets',
    description: 'Retrieve all available markets',
    parameters: [],
    response: 'Market[]'
  },
  {
    method: 'GET',
    path: '/api/markets/{id}',
    description: 'Get specific market details',
    parameters: ['id (string)'],
    response: 'Market'
  },
  {
    method: 'POST',
    path: '/api/bets',
    description: 'Place a new bet',
    parameters: ['marketId (string)', 'outcome (string)', 'amount (number)'],
    response: 'Bet'
  },
  {
    method: 'GET',
    path: '/api/user/bets',
    description: 'Get user betting history',
    parameters: ['userId (string)'],
    response: 'Bet[]'
  },
  {
    method: 'POST',
    path: '/api/markets',
    description: 'Create a new market (Admin only)',
    parameters: ['title (string)', 'description (string)', 'category (string)', 'outcomes (array)'],
    response: 'Market'
  }
];

const codeExamples = [
  {
    language: 'JavaScript',
    title: 'Fetch Markets',
    code: `const response = await fetch('https://api.dira.africa/markets');
const markets = await response.json();
console.log(markets);`
  },
  {
    language: 'Python',
    title: 'Place a Bet',
    code: `import requests

bet_data = {
    "marketId": "market_123",
    "outcome": "YES",
    "amount": 100
}

response = requests.post(
    'https://api.dira.africa/bets',
    json=bet_data,
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
print(response.json())`
  },
  {
    language: 'cURL',
    title: 'Get Market Details',
    code: `curl -X GET \\
  https://api.dira.africa/markets/market_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  }
];

const features = [
  {
    icon: Zap,
    title: 'Real-time Data',
    description: 'Get live market updates and real-time odds'
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'OAuth 2.0 and API key authentication'
  },
  {
    icon: Database,
    title: 'WebSocket Support',
    description: 'Real-time streaming for live market updates'
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Fast response times worldwide'
  }
];

export default function ApiPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
          <h1 className="text-h1 text-foreground mb-4">Dira Africa API</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Powerful REST API for integrating prediction markets into your applications
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="#docs" className="btn btn-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              View Documentation
            </Link>
            <Link href="#sdk" className="btn btn-outline">
              <Download className="h-4 w-4 mr-2" />
              Download SDK
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <div className="card-content">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-h4 text-foreground mb-2">{feature.title}</h3>
                <p className="text-body-sm text-muted">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API Endpoints */}
        <div id="docs" className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">API Endpoints</h2>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-content">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        endpoint.method === 'GET' ? 'bg-success/10 text-success' :
                        endpoint.method === 'POST' ? 'bg-primary/10 text-primary' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-body font-mono bg-muted px-2 py-1 rounded">
                        {endpoint.path}
                      </code>
                    </div>
                  </div>
                  <p className="text-body text-muted mb-3">{endpoint.description}</p>
                  {endpoint.parameters.length > 0 && (
                    <div className="mb-3">
                      <p className="text-body-sm text-foreground mb-1">Parameters:</p>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <span key={paramIndex} className="text-body-sm bg-muted px-2 py-1 rounded">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm text-foreground">Returns:</span>
                    <code className="text-body-sm font-mono bg-muted px-2 py-1 rounded">
                      {endpoint.response}
                    </code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div id="sdk" className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Code Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {codeExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-header">
                  <div className="flex items-center justify-between">
                    <h3 className="text-h4 text-foreground">{example.title}</h3>
                    <span className="text-body-sm text-muted">{example.language}</span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-body-sm font-mono overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code, example.language)}
                      className="absolute top-2 right-2 p-2 bg-background border border-border rounded hover:bg-accent transition-colors"
                    >
                      {copiedCode === example.language ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SDK Downloads */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-h2 text-foreground">SDK Downloads</h2>
          </div>
          <div className="card-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="#" className="card hover:shadow-lg transition-all duration-200">
                <div className="card-content text-center">
                  <Code className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="text-h4 text-foreground mb-2">JavaScript SDK</h3>
                  <p className="text-body-sm text-muted mb-3">npm install @dira/sdk</p>
                  <span className="text-body-sm text-primary">Download</span>
                </div>
              </Link>
              <Link href="#" className="card hover:shadow-lg transition-all duration-200">
                <div className="card-content text-center">
                  <Code className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="text-h4 text-foreground mb-2">Python SDK</h3>
                  <p className="text-body-sm text-muted mb-3">pip install dira-sdk</p>
                  <span className="text-body-sm text-primary">Download</span>
                </div>
              </Link>
              <Link href="#" className="card hover:shadow-lg transition-all duration-200">
                <div className="card-content text-center">
                  <Code className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="text-h4 text-foreground mb-2">REST API</h3>
                  <p className="text-body-sm text-muted mb-3">OpenAPI 3.0 Spec</p>
                  <span className="text-body-sm text-primary">View Spec</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
