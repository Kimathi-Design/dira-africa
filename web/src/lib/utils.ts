import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function calculatePotentialPayout(stake: number, probability: number): number {
  return stake / probability
}

export function getCategoryColor(category: string): string {
  const colors = {
    POLITICS: 'bg-red-500',
    SPORTS: 'bg-blue-500',
    CRYPTO: 'bg-yellow-500',
    ELECTIONS: 'bg-purple-500',
    ECONOMY: 'bg-green-500',
    FOOTBALL: 'bg-orange-500',
  }
  return colors[category as keyof typeof colors] || 'bg-gray-500'
}

export function getCategoryIcon(category: string): string {
  const icons = {
    POLITICS: '🏛️',
    SPORTS: '⚽',
    CRYPTO: '₿',
    ELECTIONS: '🗳️',
    ECONOMY: '📈',
    FOOTBALL: '⚽',
  }
  return icons[category as keyof typeof icons] || '📊'
}
