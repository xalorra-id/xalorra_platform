'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function ArchitectureOverview() {
  return (
    <Container id="architecture" className="mt-24 scroll-mt-24">
      <Subheading>7. Architecture Overview</Subheading>
      <Heading as="h2" className="mt-2">
        Modular, Extensible, and Open by Design
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra's architecture is designed for composability, scalability, and flexibility — allowing both individuals and teams to tailor their AI workflows end-to-end.
      </Lead>

      <div className="mt-6 max-w-3xl text-sm/6 text-gray-600 space-y-6">
        <p>
          At its core, Xalorra consists of loosely coupled components orchestrated via API and message queues. Each component — such as data ingestion, model training, or inference — can be plugged in or replaced independently.
        </p>
        <p>
          This separation enables:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Faster experimentation and modular deployments</li>
          <li>Support for both open-source and proprietary model backends</li>
          <li>Custom plugin integration for niche or industry-specific use cases</li>
          <li>Seamless collaboration across teams with isolated workspaces</li>
        </ul>
        <p>
          Xalorra supports Kubernetes for orchestration and uses GitLab CI/CD pipelines for versioning, testing, and deployment. Developers can self-host or use Xalorra Cloud with team-based billing and audit logs.
        </p>
      </div>
    </Container>
  )
}
