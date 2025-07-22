import { Container } from '@/components/container'
import { Heading, Lead } from '@/components/text'

export function Architecture() {
  return (
    <Container>
      <Heading as="h2" className="text-2xl" id="architecture">
        4. Technical Architecture
      </Heading>
      <Lead className="mt-4">
        Xalorra’s architecture is built to support both generative AI and tabular ML in a modular and scalable system.
      </Lead>
      {/* Tambahkan konten lain di sini */}
    </Container>
  )
}
