'use client'

import { Container } from '@/components/container'
import { Heading, Lead } from '@/components/text'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { TableOfContents } from '@/components/whitepaper/TableOfContents'
import { ExecutiveSummary } from '@/components/whitepaper/ExecutiveSummary'
import { VisionPhilosophy } from '@/components/whitepaper/VisionPhilosophy'
import { Introduction } from '@/components/whitepaper/Introduction'
import { ArchitectureOverview } from '@/components/whitepaper/ArchitectureOverview'
import { Architecture } from '@/components/whitepaper/Architecture'
import { KeyFeatures } from '@/components/whitepaper/KeyFeatures'
import { UserPersonas } from '@/components/whitepaper/UserPersonas'
import { Community } from '@/components/whitepaper/Community'
import { CommunityGovernance } from '@/components/whitepaper/CommunityGovernance'
import { Roadmap } from '@/components/whitepaper/Roadmap'
import { Monetization } from '@/components/whitepaper/Monetization'
import { BusinessModel } from '@/components/whitepaper/BusinessModel'
import { Conclusion } from '@/components/whitepaper/Conclusion'
import Link from 'next/link'

export default function WhitepaperPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>

      <Container className="mt-16">
        <Heading as="h1" className="text-4xl">Xalorra AI Studio Whitepaper</Heading>
        <Lead className="mt-4">Empowering Open AI Workflows for Everyone</Lead>
        <div className="mt-6">
          <a
            href="/whitepaper/xalorra_ai_studio_whitepaper_en.pdf"
            download
            className="inline-block rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Download PDF
          </a>
        </div>
      </Container>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:block lg:col-span-3 px-4 pt-12">
          <TableOfContents />
        </aside>

        <Container className="mt-16 space-y-24 lg:col-span-9">
          <section id="executive-summary"><ExecutiveSummary /></section>
          <section id="vision-philosophy"><VisionPhilosophy /></section>
          <section id="introduction"><Introduction /></section>
          <section id="architecture-overview"><ArchitectureOverview /></section>
          <section id="architecture"><Architecture /></section>
          <section id="key-features"><KeyFeatures /></section>
          <section id="user-personas"><UserPersonas /></section>
          <section id="community"><Community /></section>
          <section id="community-governance"><CommunityGovernance /></section>
          <section id="roadmap"><Roadmap /></section>
          <section id="monetization"><Monetization /></section>
          <section id="business-model"><BusinessModel /></section>
          <section id="conclusion"><Conclusion /></section>
        </Container>
      </div>

      <Footer />
    </main>
  )
}
