import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Join Xalorra Foundation — an open-source community building modular, ethical, and transparent AI workflows. Explore the future of open GenAI and tabular ML together.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/whitepaper"
              className="flex items-center gap-1 rounded-full bg-sky-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-sky-950/30"
            >
              AI for Everyone — Read Our Vision
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            AI for Everyone.
          </h1>
          <p className="mt-8 max-w-xl text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Xalorra Foundation is a global open-source community building tools, workflows, and ecosystems for responsible AI. Join us to shape the future of ethical, accessible, and modular AI — together.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="https://studio.xalorra.com">Launch Studio</Button>
            <Button variant="secondary" href="https://collab.xalorra.com">
              Explore on GitLab
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Open-source tools for real-world AI development.
        </Heading>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Free to use, fork, and improve — with a focus on GenAI and tabular ML.
        </p>
        <Screenshot
          width={1216}
          height={768}
          src="/screenshots/app.png"
          className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Community-led Projects</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Modular systems for transparent and ethical AI.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Prompt Studio"
          title="Customize with LLMs"
          description="Engineer prompts, collaborate with teams, and manage multi-model setups. Contribute improvements or build new tools."
          graphic={<div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />}
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="API & Automation"
          title="Deploy AI Anywhere"
          description="Convert workflows into APIs, automate operations, and extend provider integrations via community plugins."
          graphic={<div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />}
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Developer Experience"
          title="Built for Builders"
          description="Run pipelines from CLI to GUI. Help shape our SDK and core developer tools."
          graphic={<div className="flex size-full pl-10 pt-10"><Keyboard highlighted={["LeftCommand", "LeftShift", "D"]} /></div>}
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Hybrid AI"
          title="LLM + Tabular"
          description="Unite generative models with structured data using XGBoost, TensorFlow, and more. Add your use case."
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="Modular & Open"
          title="Build Your Ecosystem"
          description="Contribute extensions, fork pipelines, and help the community grow."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>Foundation-first Infrastructure</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Code, data, and collaboration — all open.
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Execution Engine"
            title="From Prompt to Product"
            description="Run workflows in real-time with observability. Help us add tracing, metrics, and feedback loops."
            graphic={<div className="h-80 bg-[url(/screenshots/networking.png)] bg-[size:851px_344px] bg-no-repeat" />}
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Open Integration"
            title="Bring Your Tools"
            description="Use your models, datasets, and APIs. Extend or remix with plugins built by the community."
            graphic={<LogoTimeline />}
            className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Collaboration"
            title="Open-Source Meets Teamwork"
            description="Workspaces, access control, and forking. Designed for transparent, community-led development."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Shared Roadmap"
            title="You Propose. We Build."
            description="Vote, submit PRs, and help define what Xalorra becomes — together with contributors around the world."
            graphic={<div className="h-80 bg-[url(/screenshots/engagement.png)] bg-[size:851px_344px] bg-no-repeat" />}
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

function CommunityCTA() {
  return (
    <Container className="text-center py-32">
      <Heading as="h2">Join the Foundation. Build AI.</Heading>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700">
        Whether you're a backend engineer, prompt artist, researcher, or just curious — there's a place for you in the Xalorra community.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
        <Button href="/gitlab">Join on GitLab</Button>
        <Button variant="secondary" href="https://aura.xalorra.com">
          Try GenAI Demo
        </Button>
      </div>
    </Container>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection />
        <CommunityCTA />
      </main>
      <Testimonials />
      <Footer />
    </div>
  )
}
