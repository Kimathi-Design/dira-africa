'use client';

import Link from 'next/link';

export function Footer() {
  const footerLinks = {
    'Platform': [
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Markets', href: '/markets' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Wallet', href: '/wallet' },
    ],
    'Account': [
      { name: 'Profile', href: '/profile' },
      { name: 'Login', href: '/login' },
      { name: 'Register', href: '/register' },
      { name: 'Forgot Password', href: '/forgot-password' },
    ],
    'Legal': [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'FAQ', href: '/faq' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Dira</span>
            </Link>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Africa's premier prediction markets platform. Trade on events, politics, sports, and more with confidence.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center hover:bg-brand-dark transition-colors duration-200 cursor-pointer shadow-md">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center hover:bg-brand-dark transition-colors duration-200 cursor-pointer shadow-md">
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center hover:bg-brand-dark transition-colors duration-200 cursor-pointer shadow-md">
                <span className="text-white text-sm font-bold">I</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-white text-xl mb-6 border-b border-gray-700 pb-2">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-brand-light text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-base mb-4 md:mb-0">
              © 2024 Dira. All rights reserved.
            </p>
            <div className="flex space-x-6 text-base">
              <Link href="/terms" className="text-gray-400 hover:text-brand-light transition-colors duration-200">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-brand-light transition-colors duration-200">
                Privacy
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-brand-light transition-colors duration-200">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
