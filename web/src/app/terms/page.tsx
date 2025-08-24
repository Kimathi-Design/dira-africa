'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
          <h1 className="text-h1 text-foreground mb-4">Terms of Service</h1>
          <p className="text-body-lg text-muted">Last updated: January 15, 2024</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card">
            <div className="card-content">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-h2 text-foreground mb-4 mt-8 first:mt-0">1. Acceptance of Terms</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  By accessing and using Dira Africa, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2 className="text-h2 text-foreground mb-4">2. Description of Service</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Dira Africa is a prediction markets platform focused on African events, politics, sports, and other outcomes. 
                  Users can place bets on various outcomes and earn rewards based on correct predictions.
                </p>

                <h2 className="text-h2 text-foreground mb-4">3. User Eligibility</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  You must be at least 18 years old to use our services. You must also comply with all applicable laws 
                  and regulations in your jurisdiction.
                </p>

                <h2 className="text-h2 text-foreground mb-4">4. Account Registration</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account.
                </p>

                <h2 className="text-h2 text-foreground mb-4">5. Betting and Risk</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Prediction markets involve risk. You should only bet what you can afford to lose. Past performance 
                  does not guarantee future results.
                </p>

                <h2 className="text-h2 text-foreground mb-4">6. Prohibited Activities</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  You agree not to engage in any activities that may interfere with or disrupt the service, including 
                  but not limited to fraud, manipulation, or abuse.
                </p>

                <h2 className="text-h2 text-foreground mb-4">7. Privacy</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                  use, and protect your information.
                </p>

                <h2 className="text-h2 text-foreground mb-4">8. Termination</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We reserve the right to terminate or suspend your account at any time for violations of these terms 
                  or for any other reason at our sole discretion.
                </p>

                <h2 className="text-h2 text-foreground mb-4">9. Limitation of Liability</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  Dira Africa shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                  arising out of or relating to your use of the service.
                </p>

                <h2 className="text-h2 text-foreground mb-4">10. Changes to Terms</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  We reserve the right to modify these terms at any time. Continued use of the service after changes 
                  constitutes acceptance of the new terms.
                </p>

                <h2 className="text-h2 text-foreground mb-4">11. Contact Information</h2>
                <p className="text-body text-muted leading-relaxed mb-6">
                  If you have any questions about these Terms of Service, please contact us at support@dira.africa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
