'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function Introduction() {
  return (
    <Container id="introduction" className="mt-24 scroll-mt-24">
      <Subheading>1. Introduction</Subheading>
      <Heading as="h2" className="mt-2">
        Why We Built Xalorra
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        In a world increasingly shaped by artificial intelligence, the tools for building, training, and deploying machine learning models remain fragmented, expensive, and often exclusive. Xalorra was born from the belief that AI should be accessible, transparent, and community-driven.
      </Lead>
      <p className="mt-6 text-sm/6 text-gray-600 max-w-3xl">
        This whitepaper outlines our vision for Xalorra — a unified, open-source platform that enables developers, data scientists, and organizations to collaborate on generative and tabular machine learning workflows. By democratizing access to modern AI tools, we aim to accelerate innovation and ensure that the benefits of AI reach beyond tech giants and research labs.
      </p>
      <p className="mt-4 text-sm/6 text-gray-600 max-w-3xl">
        The need for a holistic, integrated, and open AI ecosystem has never been greater. Through Xalorra Studio and Aura, our goal is to bridge the gap between research and application, between experimentation and production.
      </p>
    </Container>
  )
}
