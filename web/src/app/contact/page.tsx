'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    console.log('Contact form submitted:', formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      {/* Header */}
      <section className="py-8 bg-card">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-h1 mb-2">Contact Us</h1>
              <p className="text-body-lg text-muted">
                Get in touch with our support team
              </p>
            </div>
            <Link href="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Send us a message</h2>
                  <p className="card-subtitle">
                    We'll get back to you as soon as possible
                  </p>
                </div>
                <div className="card-content">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Doe"
                          className="form-input"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="john@example.com"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="How can we help you?"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        className="form-input form-textarea"
                        rows={6}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="card">
                  <div className="card-content">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-h4 mb-2">Email Support</h3>
                        <p className="text-body text-muted mb-2">
                          Get help via email
                        </p>
                        <a
                          href="mailto:support@dira.africa"
                          className="text-primary hover:text-primary-hover transition-colors"
                        >
                          support@dira.africa
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-h4 mb-2">Phone Support</h3>
                        <p className="text-body text-muted mb-2">
                          Call us directly
                        </p>
                        <a
                          href="tel:+254700123456"
                          className="text-primary hover:text-primary-hover transition-colors"
                        >
                          +254 700 123 456
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-h4 mb-2">Office Address</h3>
                        <p className="text-body text-muted">
                          Westlands, Nairobi<br />
                          Kenya
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-content">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-h4 mb-2">Business Hours</h3>
                        <p className="text-body text-muted">
                          Monday - Friday: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 3:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="card">
                <div className="card-content text-center">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-h4 mb-2">Need quick help?</h3>
                  <p className="text-body text-muted mb-4">
                    Check our frequently asked questions for instant answers
                  </p>
                  <Link href="/faq" className="btn btn-outline">
                    View FAQ
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
