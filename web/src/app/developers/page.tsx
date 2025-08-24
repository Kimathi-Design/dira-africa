'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, BookOpen, Download, Github, MessageSquare, Users, Zap, Database, Shield, Globe, Terminal, GitBranch, Package } from 'lucide-react';

const developerResources = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    link: '/api',
    color: 'text-primary'
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Open source repositories and examples',
    link: 'https://github.com/dira-africa',
    color: 'text-foreground'
  },
  {
    icon: Terminal,
    title: 'CLI Tools',
    description: 'Command line interface for developers',
    link: '#',
    color: 'text-success'
  },
  {
    icon: Package,
    title: 'SDKs & Libraries',
    description: 'Official SDKs for multiple languages',
    link: '/api',
    color: 'text-warning'
  }
];

const quickStartSteps = [
  {
    step: 1,
    title: 'Get API Key',
    description: 'Sign up and generate your API key from the dashboard',
    code: 'curl -X POST https://api.dira.africa/auth/key'
  },
  {
    step: 2,
    title: 'Install SDK',
    description: 'Install the official SDK for your preferred language',
    code: 'npm install @dira/sdk'
  },
  {
    step: 3,
    title: 'Make First Request',
    description: 'Test the API with a simple market fetch',
    code: `const markets = await dira.getMarkets();
console.log(markets);`
  },
  {
    step: 4,
    title: 'Build & Deploy',
    description: 'Integrate prediction markets into your application',
    code: 'git push origin main'
  }
];

const communityLinks = [
  {
    icon: MessageSquare,
    title: 'Discord Community',
    description: 'Join our developer community for support and discussions',
    link: '#',
    members: '2.5k+'
  },
  {
    icon: Users,
    title: 'Developer Forum',
    description: 'Ask questions and share your projects with other developers',
    link: '#',
    members: '1.2k+'
  },
  {
    icon: Github,
    title: 'GitHub Discussions',
    description: 'Open source discussions and feature requests',
    link: 'https://github.com/dira-africa/discussions',
    members: '800+'
  }
];

const tools = [
  {
    icon: Zap,
    title: 'API Explorer',
    description: 'Interactive API testing tool',
    link: '#'
  },
  {
    icon: Database,
    title: 'Data Dashboard',
    description: 'Real-time market data and analytics',
    link: '#'
  },
  {
    icon: Shield,
    title: 'Security Guide',
    description: 'Best practices for secure API integration',
    link: '#'
  },
  {
    icon: Globe,
    title: 'Webhook Tester',
    description: 'Test and debug webhook integrations',
    link: '#'
  }
];

export default function DevelopersPage() {
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
          <h1 className="text-h1 text-foreground mb-4">Developer Resources</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Everything you need to build amazing applications with Dira Africa's prediction markets
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="/api" className="btn btn-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              View API Docs
            </Link>
            <Link href="https://github.com/dira-africa" className="btn btn-outline">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </div>
        </div>

        {/* Developer Resources */}
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Developer Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developerResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-200"
              >
                <Link href={resource.link}>
                  <div className="card-content text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <resource.icon className={`h-6 w-6 ${resource.color}`} />
                    </div>
                    <h3 className="text-h4 text-foreground mb-2">{resource.title}</h3>
                    <p className="text-body-sm text-muted">{resource.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Quick Start Guide</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-content">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground font-semibold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h4 text-foreground mb-2">{step.title}</h3>
                      <p className="text-body-sm text-muted mb-3">{step.description}</p>
                      <pre className="bg-muted p-3 rounded text-body-sm font-mono overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Developer Tools */}
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-200"
              >
                <Link href={tool.link}>
                  <div className="card-content text-center">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-h4 text-foreground mb-2">{tool.title}</h3>
                    <p className="text-body-sm text-muted">{tool.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Join the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityLinks.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-200"
              >
                <Link href={community.link}>
                  <div className="card-content">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                        <community.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-h4 text-foreground">{community.title}</h3>
                        <p className="text-body-sm text-success">{community.members} members</p>
                      </div>
                    </div>
                    <p className="text-body-sm text-muted">{community.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card">
          <div className="card-content text-center">
            <h2 className="text-h2 text-foreground mb-4">Ready to Build?</h2>
            <p className="text-body-lg text-muted mb-6 max-w-2xl mx-auto">
              Start building with Dira Africa's prediction markets today. Join thousands of developers creating innovative applications.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/api" className="btn btn-primary btn-lg">
                <Code className="h-4 w-4 mr-2" />
                Get Started
              </Link>
              <Link href="https://github.com/dira-africa" className="btn btn-outline btn-lg">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
