import type { Metadata } from 'next'
import './globals.css'
import { Menu, X, Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dira Africa - Prediction Markets',
  description: 'The premier prediction market platform for Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Navigation */}
        <nav className="navbar">
          <div className="navbar-container">
            {/* Logo */}
            <a href="/" className="navbar-logo">
              Dira Africa
            </a>

            {/* Desktop Navigation */}
            <div className="navbar-nav hidden md:flex">
              <a href="/" className="navbar-link">Home</a>
              <a href="/markets" className="navbar-link">Markets</a>
              <a href="/wallet" className="navbar-link">Wallet</a>
              <a href="/profile" className="navbar-link">Profile</a>
              <a href="/admin" className="navbar-link">Admin</a>
            </div>

            {/* Auth Buttons */}
            <div className="navbar-nav hidden md:flex">
              <a href="/login" className="btn btn-ghost">Log In</a>
              <a href="/register" className="btn btn-primary">Sign Up</a>
            </div>

            {/* Mobile Menu Button */}
            <button className="btn btn-ghost md:hidden" id="mobile-menu-btn">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className="mobile-menu-overlay" id="mobile-menu-overlay"></div>

        {/* Mobile Menu */}
        <div className="mobile-menu" id="mobile-menu">
          <div className="flex items-center justify-between mb-6">
            <a href="/" className="navbar-logo">Dira Africa</a>
            <button className="btn btn-ghost" id="mobile-menu-close">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <a href="/" className="block text-body font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="/markets" className="block text-body font-medium text-foreground hover:text-primary transition-colors">
              Markets
            </a>
            <a href="/wallet" className="block text-body font-medium text-foreground hover:text-primary transition-colors">
              Wallet
            </a>
            <a href="/profile" className="block text-body font-medium text-foreground hover:text-primary transition-colors">
              Profile
            </a>
            <a href="/admin" className="block text-body font-medium text-foreground hover:text-primary transition-colors">
              Admin
            </a>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <div className="space-y-3">
              <a href="/login" className="btn btn-outline w-full justify-center">
                Log In
              </a>
              <a href="/register" className="btn btn-primary w-full justify-center">
                Sign Up
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-grid">
              <div className="footer-section">
                <h3>Dira Africa</h3>
                <p className="text-body-sm">
                  The premier prediction market platform for Africa. Trade on events, politics, sports, and more.
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="footer-section">
                <h3>Platform</h3>
                <ul className="space-y-2">
                  <li><a href="/markets">Markets</a></li>
                  <li><a href="/wallet">Wallet</a></li>
                  <li><a href="/profile">Profile</a></li>
                  <li><a href="/how-it-works">How it Works</a></li>
                  <li><a href="/faq">FAQ</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Support</h3>
                <ul className="space-y-2">
                  <li><a href="/help">Help Center</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                  <li><a href="/terms">Terms of Service</a></li>
                  <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Resources</h3>
                <ul className="space-y-2">
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="/api">API</a></li>
                  <li><a href="/developers">Developers</a></li>
                  <li><a href="/status">Status</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2024 Dira Africa. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Mobile Menu JavaScript */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const mobileMenuBtn = document.getElementById('mobile-menu-btn');
              const mobileMenuClose = document.getElementById('mobile-menu-close');
              const mobileMenu = document.getElementById('mobile-menu');
              const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

              function openMobileMenu() {
                mobileMenu.classList.add('open');
                mobileMenuOverlay.classList.add('open');
                document.body.style.overflow = 'hidden';
              }

              function closeMobileMenu() {
                mobileMenu.classList.remove('open');
                mobileMenuOverlay.classList.remove('open');
                document.body.style.overflow = '';
              }

              mobileMenuBtn.addEventListener('click', openMobileMenu);
              mobileMenuClose.addEventListener('click', closeMobileMenu);
              mobileMenuOverlay.addEventListener('click', closeMobileMenu);

              // Close menu on escape key
              document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                  closeMobileMenu();
                }
              });
            });
          `
        }} />
      </body>
    </html>
  )
}
