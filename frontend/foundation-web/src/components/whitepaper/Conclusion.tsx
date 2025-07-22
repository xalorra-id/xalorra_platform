import { Container } from '@/components/container'
import { Heading, Lead } from '@/components/text'

export function Conclusion() {
  return (
    <Container>
      <Heading as="h2" className="text-2xl" id="conclusion">
        11. Conclusion
      </Heading>
      <Lead className="mt-4">
        Xalorra aims to reshape how individuals and teams interact with AI and data by promoting openness, modularity, and usability.
      </Lead>
      {/* Tambahkan penutup jika ada */}
    </Container>
  )
}
