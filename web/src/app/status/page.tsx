'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Globe, Shield, Zap } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  lastIncident?: string;
}

const services: ServiceStatus[] = [
  {
    name: 'API',
    status: 'operational',
    uptime: 99.98,
    responseTime: 45
  },
  {
    name: 'Web Application',
    status: 'operational',
    uptime: 99.95,
    responseTime: 120
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: 99.99,
    responseTime: 12
  },
  {
    name: 'Payment Processing',
    status: 'operational',
    uptime: 99.97,
    responseTime: 180
  },
  {
    name: 'WebSocket',
    status: 'operational',
    uptime: 99.94,
    responseTime: 25
  },
  {
    name: 'CDN',
    status: 'operational',
    uptime: 99.99,
    responseTime: 8
  }
];

const incidents = [
  {
    id: 1,
    title: 'Scheduled Maintenance - API',
    status: 'resolved',
    severity: 'maintenance',
    date: '2024-01-10T10:00:00Z',
    description: 'Routine maintenance to improve API performance and security.',
    duration: '2 hours'
  },
  {
    id: 2,
    title: 'Database Connection Issues',
    status: 'resolved',
    severity: 'minor',
    date: '2024-01-05T15:30:00Z',
    description: 'Temporary database connection issues affecting some users.',
    duration: '45 minutes'
  },
  {
    id: 3,
    title: 'CDN Performance Degradation',
    status: 'resolved',
    severity: 'minor',
    date: '2023-12-28T08:15:00Z',
    description: 'Slower response times in certain regions due to CDN issues.',
    duration: '1 hour'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="h-5 w-5 text-success" />;
    case 'degraded':
      return <AlertCircle className="h-5 w-5 text-warning" />;
    case 'outage':
      return <XCircle className="h-5 w-5 text-destructive" />;
    default:
      return <Clock className="h-5 w-5 text-muted" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'bg-success/10 text-success';
    case 'degraded':
      return 'bg-warning/10 text-warning';
    case 'outage':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-destructive/10 text-destructive';
    case 'major':
      return 'bg-warning/10 text-warning';
    case 'minor':
      return 'bg-primary/10 text-primary';
    case 'maintenance':
      return 'bg-secondary/10 text-secondary';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded';
  const averageUptime = services.reduce((acc, service) => acc + service.uptime, 0) / services.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          <h1 className="text-h1 text-foreground mb-4">System Status</h1>
          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Real-time status of Dira Africa's services and infrastructure
          </p>
        </div>

        {/* Overall Status */}
        <div className="card mb-8">
          <div className="card-content">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {getStatusIcon(overallStatus)}
                <div>
                  <h2 className="text-h2 text-foreground">All Systems Operational</h2>
                  <p className="text-body text-muted">Last updated: {currentTime.toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-h3 text-foreground font-bold">{averageUptime.toFixed(2)}%</div>
                <div className="text-body-sm text-muted">Average Uptime</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat-card text-center">
                <Activity className="h-6 w-6 text-success mb-2" />
                <div className="stat-number text-success">{services.length}</div>
                <div className="stat-label">Services</div>
              </div>
              <div className="stat-card text-center">
                <CheckCircle className="h-6 w-6 text-success mb-2" />
                <div className="stat-number text-success">
                  {services.filter(s => s.status === 'operational').length}
                </div>
                <div className="stat-label">Operational</div>
              </div>
              <div className="stat-card text-center">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <div className="stat-number text-primary">
                  {Math.round(services.reduce((acc, s) => acc + s.responseTime, 0) / services.length)}ms
                </div>
                <div className="stat-label">Avg Response</div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Service Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-content">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <h3 className="text-h4 text-foreground">{service.name}</h3>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="text-muted">Uptime</span>
                      <span className="text-foreground font-medium">{service.uptime}%</span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="text-muted">Response Time</span>
                      <span className="text-foreground font-medium">{service.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="mb-12">
          <h2 className="text-h2 text-foreground mb-6">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-content">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(incident.status)}
                      <div>
                        <h3 className="text-h4 text-foreground">{incident.title}</h3>
                        <p className="text-body-sm text-muted">{formatDate(incident.date)}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-body text-muted mb-3">{incident.description}</p>
                  <div className="flex items-center gap-4 text-body-sm text-muted">
                    <span>Duration: {incident.duration}</span>
                    <span>Status: {incident.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="card">
          <div className="card-content text-center">
            <h2 className="text-h2 text-foreground mb-4">Stay Updated</h2>
            <p className="text-body-lg text-muted mb-6 max-w-2xl mx-auto">
              Get notified about service updates, maintenance, and incidents via email or RSS.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="#" className="btn btn-primary">
                Subscribe to Updates
              </Link>
              <Link href="#" className="btn btn-outline">
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
