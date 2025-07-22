'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function CommunityGovernance() {
  return (
    <Container id="community-governance" className="mt-24 scroll-mt-24">
      <Subheading>5. Community, Governance, and Monetization</Subheading>
      <Heading as="h2" className="mt-2">
        Open Development with Sustainable Value
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra is developed in public, governed by its contributors, and designed for long-term sustainability through value-aligned monetization.
      </Lead>

      <div className="mt-6 max-w-3xl text-sm/6 text-gray-600 space-y-4">
        <p>
          The core codebase is open-source under the MIT License. Community contributors can propose features, submit pull requests, or report issues via GitLab.
        </p>
        <p>
          Xalorra Foundation oversees the open ecosystem and stewarding of IP and trademark. Meanwhile, Xalorra Inc. manages paid offerings, enterprise support, and infrastructure hosting.
        </p>
        <p>
          Monetization is aligned with usage — not ownership. We provide:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Free tier for indie devs and open science use</li>
          <li>Paid team plans with CI/CD, usage-based training, and hosted vector DB</li>
          <li>On-premise enterprise licensing</li>
        </ul>
        <p>
          We believe open tools thrive when they are both usable and valuable. Our dual structure enables this balance.
        </p>
      </div>
    </Container>
  )
}
