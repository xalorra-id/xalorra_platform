import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GitLab Overview',
  description:
    'Platform GitLab open-source milik Yayasan Xalorra — aman, kolaboratif, dan terbuka untuk komunitas global.',
}

function GitLabIntro() {
  return (
    <Container className="mt-16 pb-32">
      <Heading as="h1">Welcome to Xalorra GitLab</Heading>
      <Lead className="mt-6 max-w-3xl">
        Xalorra GitLab is the home of open collaboration across the Xalorra ecosystem. This is where community-driven AI tools are discussed, developed, and deployed — together.
      </Lead>

      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium tracking-tight">Why GitLab?</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            We believe that the best technology is built openly. GitLab gives contributors powerful tools for CI/CD, issue tracking, merge requests, and collaborative development — all in one unified platform.
          </p>
          <p className="mt-6 text-sm/6 text-gray-600">
            By self-hosting GitLab under the Xalorra Foundation, we ensure full transparency, long-term control, and a safe space for developers to contribute, learn, and grow together.
          </p>
          <p className="mt-6 text-sm/6 text-gray-600">
            Whether you're a student, engineer, researcher, or independent builder — you are welcome here. We value every contribution, big or small.
          </p>
          <p className="mt-6 text-sm/6 text-gray-600">
            Join us. One commit at a time, let’s shape the future of open, community-powered AI infrastructure.
          </p>

          <div className="mt-8">
            <Button href="https://collab.xalorra.com">Enter GitLab</Button>
          </div>
        </div>

        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <img src="/images/gitlab/gitlab-ui.png" alt="GitLab UI" className="rounded-xl shadow" />
            <img src="/images/gitlab/xalorra-collab.png" alt="Xalorra Collaboration" className="rounded-xl shadow" />
          </div>
        </div>
      </section>
    </Container>
  )
}

export default function GitLabOverviewPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <GitLabIntro />
      <Footer />
    </main>
  )
}
