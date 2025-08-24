'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Wallet, TrendingUp, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Markets', href: '/markets' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Wallet', href: '/wallet' },
    { name: 'Profile', href: '/profile' },
    { name: 'Admin', href: '/admin' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dira</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-brand dark:text-brand-light'
                    : 'text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-brand-light'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm font-medium uppercase tracking-wide">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-teal-600 text-sm font-medium uppercase tracking-wide">
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-brand bg-brand/10 dark:text-brand-light dark:bg-brand/20'
                      : 'text-gray-600 hover:text-brand hover:bg-gray-50 dark:text-gray-300 dark:hover:text-brand-light dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-brand dark:text-gray-300 dark:hover:text-brand-light">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full justify-start bg-brand hover:bg-brand-dark dark:bg-brand dark:hover:bg-teal-600">
                    <User className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
