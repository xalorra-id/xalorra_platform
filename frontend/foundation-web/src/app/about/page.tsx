import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Xalorra is an open-source platform designed to make AI development more transparent, collaborative, and accessible to everyone.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">AI infrastructure, built by the community.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra is an open-source initiative that empowers developers, researchers, and creators to build and deploy AI solutions with full transparency and control. Our goal is to democratize access to intelligent systems — and the tools to build them.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">Our vision</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            We believe that the future of AI should not be monopolized or hidden behind paywalls and closed APIs. Xalorra exists to make AI infrastructure open, trustworthy, and inclusive — so that every individual or organization can build intelligent systems that serve real human needs.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            From GenAI pipelines to tabular machine learning, we provide a modular, composable stack that enables experimentation, collaboration, and scale — all while staying open and community-governed.
          </p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            {/* image grid */}
            <img src="/images/about/infra.png" alt="Xalorra infrastructure" className="rounded-xl shadow" />
            <img src="/images/about/community.png" alt="Xalorra community" className="rounded-xl shadow" />
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          <Subheading>Our Impact</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Lines of Open Code</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={100} end={250} />K+
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Contributors Worldwide</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={15} end={70} />
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
              <dt className="text-sm/6 text-gray-600">AI Pipelines Executed</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={1} end={2.4} decimals={1} />M
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">Downloads & Forks</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={150} end={300} />K
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </Container>
  )
}

function Team() {
  return (
    <Container className="mt-32">
      <Subheading>The Foundation</Subheading>
      <Heading as="h3" className="mt-2">
        Built by people who care about the future of AI.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra Foundation is an independent, community-run organization stewarding the development and governance of the Xalorra ecosystem.
      </Lead>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <p className="text-sm/6 text-gray-600">
            We are developers, researchers, activists, and dreamers united by a belief: that AI should serve the many, not the few. Our foundation operates transparently and welcomes contributions from anyone who shares our values.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            From global collaboration to grassroots education, Xalorra aims to make AI tools understandable, remixable, and buildable by everyone.
          </p>
          <div className="mt-6">
            <Button className="w-full sm:w-auto" href="https://foundation.xalorra.com">
              Learn More About the Foundation
            </Button>
          </div>
        </div>
        <div className="max-lg:order-first max-lg:max-w-lg">
          <div className="aspect-[3/2] overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
            <img
              alt="Xalorra team"
              src="/images/about/team.jpg"
              className="block size-full object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

function CallToAction() {
  return (
    <Container className="my-32">
      <Subheading>Get Involved</Subheading>
      <Heading as="h3" className="mt-2">
        Join a global movement for open, ethical, and collaborative AI.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Whether you want to contribute code, explore our tools, or bring Xalorra to your local community — there's a place for you here.
      </Lead>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="https://collab.xalorra.com">Explore GitLab</Button>
        <Button href="https://aura.xalorra.com" variant="secondary">
          Try Aura GenAI
        </Button>
        <Button href="https://discord.gg/xalorra" variant="outline">
          Join our Community
        </Button>
      </div>
    </Container>
  )
}

export default function About() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Team />
      <CallToAction />
      <Footer />
    </main>
  )
}
