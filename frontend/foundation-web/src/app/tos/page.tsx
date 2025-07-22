import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Xalorra as of June 2025.',
}

export default function ToSPage() {
  return (
    <main className="overflow-hidden bg-white">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <section className="relative z-10">
        <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
          <header className="mb-10 text-center">
            <h1 className="text-2xl font-semibold text-gray-700 uppercase tracking-wide">
              Xalorra Terms of Service (ToS)
            </h1>
            <p className="mt-1 text-sm text-gray-500">Effective Date: June 2025</p>
          </header>

          <Lead className="mt-6 mb-10 text-gray-700">
            Welcome to Xalorra. These Terms of Service ("Terms") govern your access to and use of the Xalorra platform, products, and services, whether as a visitor, contributor, or registered user. By accessing or using any part of our services, you agree to be bound by these Terms.
          </Lead>

          <div className="prose prose-neutral prose-lg">
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using Xalorra's services ("Services"), you agree to comply with these Terms, our Privacy Policy, and any community guidelines or additional terms that may apply. If you do not agree, you may not access or use the Services.</p>
            </section>

            <section>
              <h2>2. Eligibility</h2>
              <p>To use our Services, you must be at least 13 years old or the minimum age of digital consent in your jurisdiction. By using Xalorra, you affirm that you meet the eligibility requirements and have the legal capacity to enter into these Terms.</p>
            </section>

            <section>
              <h2>3. Account Registration and Security</h2>
              <ul>
                <li>You may be required to create an account to access certain features.</li>
                <li>You must provide accurate, current, and complete information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.</li>
                <li>Xalorra is not liable for any loss or damage from your failure to secure your account.</li>
              </ul>
            </section>

            <section>
              <h2>4. Use of Services</h2>
              <ul>
                <li>Use the Services only for lawful and authorized purposes.</li>
                <li>Refrain from uploading or distributing content that is harmful, abusive, illegal, infringing, or otherwise objectionable.</li>
                <li>Do not interfere with or disrupt the integrity or performance of our systems or other users.</li>
                <li>Do not attempt to gain unauthorized access to the Services, user accounts, or data.</li>
              </ul>
            </section>

            <section>
              <h2>5. Content and Intellectual Property</h2>
              <ul>
                <li>You retain ownership of the content you create, submit, or upload via the Services.</li>
                <li>By sharing content on Xalorra, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your content solely to operate and promote the Services.</li>
                <li>The Xalorra platform, including all software, design, trademarks, and documentation, is owned by Xalorra and protected by intellectual property laws.</li>
              </ul>
            </section>

            <section>
              <h2>6. Open Source Contributions</h2>
              <ul>
                <li>Contributions to our repositories are welcome and governed by the relevant open source license (e.g., MIT, Apache 2.0).</li>
                <li>You represent that you have the rights to contribute and license any code or documentation submitted.</li>
                <li>Xalorra may use submitted contributions in both community and commercial offerings.</li>
              </ul>
            </section>

            <section>
              <h2>7. Paid Services and Billing</h2>
              <ul>
                <li>Some features may require a paid subscription or usage-based billing.</li>
                <li>By purchasing a paid service, you agree to our pricing, billing cycles, and payment terms.</li>
                <li>All fees are non-refundable unless otherwise required by law or explicitly stated in writing.</li>
                <li>We reserve the right to modify pricing with prior notice.</li>
              </ul>
            </section>

            <section>
              <h2>8. Service Availability and Support</h2>
              <ul>
                <li>Xalorra strives to ensure high availability but does not guarantee uninterrupted access.</li>
                <li>Maintenance, updates, or technical issues may result in temporary downtime.</li>
                <li>Support is provided on a best-effort basis for community users and more formally for paid tiers.</li>
              </ul>
            </section>

            <section>
              <h2>9. Termination and Suspension</h2>
              <ul>
                <li>We may suspend or terminate access to your account or Services at our discretion, particularly in cases of policy violations, abuse, or security risks.</li>
                <li>You may terminate your account at any time through your settings or by contacting support.</li>
                <li>Upon termination, your access will cease, but your content may be retained in accordance with our data policy.</li>
              </ul>
            </section>

            <section>
              <h2>10. Disclaimers</h2>
              <p>The Services are provided "as is" without warranty of any kind. Xalorra disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee the accuracy, completeness, or usefulness of any AI-generated output.</p>
            </section>

            <section>
              <h2>11. Limitation of Liability</h2>
              <p>Xalorra shall not be liable for any indirect, incidental, consequential, or punitive damages. Our aggregate liability for any claims related to the Services shall not exceed the amount paid by you (if any) in the past 12 months.</p>
            </section>

            <section>
              <h2>12. Privacy and Data Use</h2>
              <p>We respect your privacy. Please refer to our Privacy Policy for details on how we collect, use, and protect your personal data. By using the Services, you consent to our data practices.</p>
            </section>

            <section>
              <h2>13. Modifications to Terms</h2>
              <p>We may update these Terms from time to time. We will provide notice of material changes. Continued use of the Services constitutes your acceptance of the updated Terms.</p>
            </section>

            <section>
              <h2>14. Governing Law and Jurisdiction</h2>
              <p>These Terms are governed by the laws of Indonesia. Any disputes will be resolved in the courts of Indonesia, unless otherwise required by applicable law.</p>
            </section>

            <section>
              <h2>15. Contact Information</h2>
              <p>If you have questions or concerns about these Terms, please contact us at:</p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:legal@xalorra.com">legal@xalorra.com</a></li>
                <li><strong>Website:</strong> <a href="https://www.xalorra.com">www.xalorra.com</a></li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
