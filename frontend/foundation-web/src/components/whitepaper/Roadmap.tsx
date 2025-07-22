'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function Roadmap() {
  return (
    <Container id="roadmap" className="mt-24 scroll-mt-24">
      <Subheading>11. Roadmap & Milestones</Subheading>
      <Heading as="h2" className="mt-2">
        From prototype to production
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra is in active development, with a staged roadmap toward full open-source maturity and enterprise readiness.
      </Lead>

      <div className="mt-6 max-w-3xl text-sm/6 text-gray-600 space-y-6">
        <p>Our roadmap is divided into three phases:</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <strong>Q2–Q3 2025:</strong> MVP launch of Xalorra Studio (GenAI + Tabular), whitepaper publication, community GitLab setup, early user onboarding.
          </li>
          <li>
            <strong>Q4 2025–Q1 2026:</strong> Release of AutoML, workspace billing, plugin SDK, community voting, and dataset labeling tools.
          </li>
          <li>
            <strong>Q2 2026 and beyond:</strong> Full-fledged AI operating system with workflow orchestration, data pipelines, reproducible experiments, and real-time collaboration.
          </li>
        </ul>
        <p>
          The roadmap is designed to remain flexible, adapting to community feedback and real-world usage. Our core mission remains constant: empowering people to build with open AI.
        </p>
      </div>
    </Container>
  )
}
