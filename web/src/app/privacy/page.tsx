'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-h1 text-foreground mb-4">Privacy Policy</h1>
          <p className="text-body-lg text-muted">Last updated: January 15, 2024</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card">
            <div className="card-content">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-h2 text-foreground mb-4 mt-8 first:mt-0">1. Information We Collect</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We collect information you provide directly to us, such as when you create an account, 
                  place bets, or contact us for support.
                </p>

                <h2 className="text-h2 text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We use the information we collect to provide, maintain, and improve our services, 
                  process transactions, and communicate with you.
                </p>

                <h2 className="text-h2 text-foreground mb-4">3. Information Sharing</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>

                <h2 className="text-h2 text-foreground mb-4">4. Data Security</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2 className="text-h2 text-foreground mb-4">5. Cookies and Tracking</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We use cookies and similar technologies to enhance your experience and collect information 
                  about how you use our platform.
                </p>

                <h2 className="text-h2 text-foreground mb-4">6. Your Rights</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  You have the right to access, update, or delete your personal information. You can also 
                  opt out of certain communications.
                </p>

                <h2 className="text-h2 text-foreground mb-4">7. Data Retention</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We retain your personal information for as long as necessary to provide our services 
                  and comply with legal obligations.
                </p>

                <h2 className="text-h2 text-foreground mb-4">8. International Transfers</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place.
                </p>

                <h2 className="text-h2 text-foreground mb-4">9. Children's Privacy</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Our services are not intended for children under 18. We do not knowingly collect 
                  personal information from children under 18.
                </p>

                <h2 className="text-h2 text-foreground mb-4">10. Changes to This Policy</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page.
                </p>

                <h2 className="text-h2 text-foreground mb-4">11. Contact Us</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy, please contact us at privacy@dira.africa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
