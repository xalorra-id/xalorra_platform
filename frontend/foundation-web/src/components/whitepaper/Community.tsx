'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function Community() {
  return (
    <Container id="community" className="mt-24 scroll-mt-24">
      <Subheading>10. Community & Contribution</Subheading>
      <Heading as="h2" className="mt-2">
        Built in the open, powered by the community
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra is a community-driven platform built around transparency, collaboration, and global contributions.
      </Lead>

      <div className="mt-6 max-w-3xl text-sm/6 text-gray-600 space-y-6">
        <p>
          All source code is hosted on a self-managed GitLab instance at <strong>collab.xalorra.com</strong>, designed to support both internal development and community projects.
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            Contributors receive badges and project visibility within the community dashboard.
          </li>
          <li>
            We accept contributions to GenAI agents, Tabular ML components, UI kits, backend pipelines, and infrastructure modules.
          </li>
          <li>
            Non-code contributions such as documentation, testing, localization, and design are equally valued.
          </li>
        </ul>
        <p>
          Our long-term vision is to evolve Xalorra into a community-driven AI operating system — flexible, extensible, and owned by its builders.
        </p>
      </div>
    </Container>
  )
}
