'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Search, Filter, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Prediction Markets in Africa',
    excerpt: 'How decentralized prediction markets are revolutionizing decision-making across the African continent.',
    author: 'Dira Team',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Technology',
    tags: ['prediction markets', 'africa', 'blockchain'],
    featured: true
  },
  {
    id: 2,
    title: 'Understanding Market Liquidity in Prediction Markets',
    excerpt: 'A deep dive into how liquidity works in prediction markets and why it matters for traders.',
    author: 'Market Analyst',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Education',
    tags: ['liquidity', 'trading', 'markets']
  },
  {
    id: 3,
    title: 'Building Trust in Decentralized Prediction Markets',
    excerpt: 'Exploring the mechanisms that ensure fairness and transparency in prediction market platforms.',
    author: 'Security Expert',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Security',
    tags: ['trust', 'security', 'transparency']
  },
  {
    id: 4,
    title: 'Case Study: Election Prediction Markets in Nigeria',
    excerpt: 'How prediction markets accurately forecasted the 2023 Nigerian presidential election results.',
    author: 'Research Team',
    date: '2023-12-28',
    readTime: '8 min read',
    category: 'Case Study',
    tags: ['elections', 'nigeria', 'case study']
  },
  {
    id: 5,
    title: 'The Economics of Information Aggregation',
    excerpt: 'How prediction markets efficiently aggregate dispersed information from diverse participants.',
    author: 'Economist',
    date: '2023-12-20',
    readTime: '4 min read',
    category: 'Economics',
    tags: ['economics', 'information', 'aggregation']
  },
  {
    id: 6,
    title: 'Mobile-First Design for African Markets',
    excerpt: 'Why mobile-first design is crucial for prediction market adoption in African markets.',
    author: 'UX Designer',
    date: '2023-12-15',
    readTime: '5 min read',
    category: 'Design',
    tags: ['mobile', 'design', 'africa']
  }
];

const categories = ['All', 'Technology', 'Education', 'Security', 'Case Study', 'Economics', 'Design'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
          <h1 className="text-h1 text-foreground mb-4">Dira Africa Blog</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Insights, analysis, and updates from the world of prediction markets in Africa
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="card-content">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && filteredPosts[0]?.featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="card-content">
              <div className="flex items-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  Featured
                </span>
              </div>
              <h2 className="text-h2 text-foreground mb-3">
                {filteredPosts[0].title}
              </h2>
              <p className="text-body-lg text-muted mb-4">
                {filteredPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-body-sm text-muted">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {filteredPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(filteredPosts[0].date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {filteredPosts[0].readTime}
                  </div>
                </div>
                <Link href={`/blog/${filteredPosts[0].id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted" />
                {filteredPosts[0].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.filter(post => !post.featured).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-all duration-200"
            >
              <div className="card-content">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-h4 text-foreground mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-body-sm text-muted mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-body-sm text-muted">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1 text-body-sm text-muted">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-body-sm text-muted">
                    {formatDate(post.date)}
                  </div>
                  <Link href={`/blog/${post.id}`} className="btn btn-outline btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body-lg text-muted">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
