'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function BusinessModel() {
  return (
    <Container id="business-model" className="mt-24 scroll-mt-24">
      <Subheading>9. Business Model & Monetization</Subheading>
      <Heading as="h2" className="mt-2">
        Balancing Open Collaboration with Sustainable Growth
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra’s business model is designed to support open development while enabling monetization through scalable, modular offerings.
      </Lead>

      <div className="mt-6 max-w-3xl text-sm/6 text-gray-600 space-y-6">
        <p>
          We operate on a <strong>freemium and value-based pricing model</strong>. All core features are open-source and free to use. Monetization will begin once the platform reaches a stable base and real demand emerges.
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <strong>Free Tier:</strong>  
            Access to the GenAI playground, tabular workflows, and community-hosted GitLab CI/CD — ideal for hobbyists and contributors.
          </li>
          <li>
            <strong>Paid Tier:</strong>  
            Includes custom model training, private workspaces, billing dashboards, usage quotas, and priority support.
          </li>
          <li>
            <strong>Enterprise Solutions:</strong>  
            White-label deployments, on-premise setups, and integration with internal infrastructure for larger organizations.
          </li>
        </ul>
        <p>
          Our goal is to foster an open ecosystem where independent developers, startups, and enterprises can benefit — whether through self-hosting or by subscribing to hosted versions.
        </p>
      </div>
    </Container>
  )
}
