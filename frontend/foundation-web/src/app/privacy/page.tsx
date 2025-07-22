import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Xalorra collects, uses, and protects your data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="overflow-hidden bg-white">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <section className="relative z-10">
        <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
          <header className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 uppercase tracking-wide">
              Xalorra Privacy Policy
            </h2>
            <p className="mt-1 text-sm text-gray-500">Effective Date: June 2025</p>
          </header>

          <article className="prose prose-neutral prose-lg">
            <h3>1. Information We Collect</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, organization, password, and profile details.</li>
              <li><strong>Usage Data:</strong> Interactions, IP address, browser, device info, pages visited, usage patterns.</li>
              <li><strong>Content and Contributions:</strong> Files, models, comments, and user-generated content.</li>
              <li><strong>Billing Information:</strong> Payment data (via third parties), transaction history, subscription type.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <ul>
              <li>Provide and maintain the Xalorra platform</li>
              <li>Manage account and preferences</li>
              <li>Send notifications and updates</li>
              <li>Improve performance and features</li>
              <li>Security, fraud detection, enforce Terms of Service</li>
              <li>Legal compliance</li>
            </ul>

            <h3>3. Sharing and Disclosure</h3>
            <p>We do not sell your personal information. Data may be shared with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Hosting, analytics, billing, email (e.g., Stripe, Mailcow)</li>
              <li><strong>Open Source Contributions:</strong> Public contributions show username and content</li>
              <li><strong>Legal and Compliance:</strong> As required by law or authorities</li>
            </ul>

            <h3>4. Data Retention</h3>
            <p>We retain data while your account is active or as needed. Some data may be kept to comply with legal obligations or resolve disputes.</p>

            <h3>5. Your Rights</h3>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent where applicable</li>
              <li>Object to or restrict certain processing</li>
              <li>Lodge a complaint with a data authority</li>
            </ul>

            <h3>6. Security Measures</h3>
            <ul>
              <li>Encrypted data transfer (HTTPS)</li>
              <li>Password hashing</li>
              <li>Access control and internal logs</li>
              <li>Isolated sandbox environments</li>
            </ul>

            <h3>7. International Transfers</h3>
            <p>Your data may be processed or stored outside your country. We ensure safeguards are in place for international transfers.</p>

            <h3>8. Children&apos;s Privacy</h3>
            <p>Our services are not intended for children under 13. We do not knowingly collect data from minors.</p>

            <h3>9. Changes to This Policy</h3>
            <p>We may update this Privacy Policy. We&apos;ll notify users of material changes and update the &quot;Effective Date&quot;.</p>

            <h3>10. Contact Us</h3>
            <p>If you have questions or requests about this Privacy Policy, contact us at:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:privacy@xalorra.com">privacy@xalorra.com</a></li>
              <li><strong>Website:</strong> <a href="https://www.xalorra.com">www.xalorra.com</a></li>
            </ul>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
