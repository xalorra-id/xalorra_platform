'use client'

import { Container } from '@/components/container'
import { Heading, Lead, Subheading } from '@/components/text'

export function VisionPhilosophy() {
  return (
    <Container id="vision-philosophy" className="mt-24 scroll-mt-24">
      <Subheading>2. Vision & Philosophy</Subheading>
      <Heading as="h2" className="mt-2">
        Open Collaboration for a Smarter Future
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        We believe that the future of AI lies in collective intelligence — systems that are not only technically advanced, but also built with openness, collaboration, and ethical grounding.
      </Lead>
      <p className="mt-6 text-sm/6 text-gray-600 max-w-3xl">
        Our vision is to make the development of artificial intelligence as transparent and accessible as building a website. We are building Xalorra as a platform where everyone — from hobbyists to enterprises — can contribute, iterate, and deploy AI solutions without vendor lock-in.
      </p>
      <p className="mt-4 text-sm/6 text-gray-600 max-w-3xl">
        Inspired by the success of open ecosystems like Linux and Hugging Face, we envision Xalorra as the backbone of a new AI development culture: one driven by community, not corporations; by ideas, not gatekeeping.
      </p>
      <p className="mt-4 text-sm/6 text-gray-600 max-w-3xl">
        Our philosophy is grounded in three principles: openness, modularity, and empowerment. Every component of Xalorra is designed to be extensible, remixable, and production-ready — enabling people to build for today while shaping tomorrow.
      </p>
    </Container>
  )
}
