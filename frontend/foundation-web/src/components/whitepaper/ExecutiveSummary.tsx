'use client'

import { Heading, Lead, Subheading } from '@/components/text'
import { Container } from '@/components/container'

export function ExecutiveSummary() {
  return (
    <Container className="mt-32 scroll-mt-32" id="executive-summary">
      <Subheading>1. Executive Summary</Subheading>
      <Heading as="h2" className="mt-2">
        Empowering Open AI Workflows for Everyone
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra AI Studio is an open-source platform that integrates generative AI and traditional machine learning (tabular) into a single collaborative workflow. It empowers users — from data scientists to indie developers — to build, experiment, and deploy models in a modular, reproducible, and scalable manner.
      </Lead>
    </Container>
  )
}
