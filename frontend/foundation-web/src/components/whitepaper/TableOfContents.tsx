'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

interface TOCItem {
  id: string
  label: string
}

const tocItems: TOCItem[] = [
  { id: 'executive-summary', label: '1. Executive Summary' },
  { id: 'vision-philosophy', label: '2. Vision & Philosophy' },
  { id: 'introduction', label: '3. Introduction' },
  { id: 'architecture-overview', label: '4. Architecture Overview' },
  { id: 'architecture', label: '5. Architecture Details' },
  { id: 'key-features', label: '6. Key Features' },
  { id: 'user-personas', label: '7. User Personas' },
  { id: 'community', label: '8. Community Engagement' },
  { id: 'community-governance', label: '9. Governance Model' },
  { id: 'roadmap', label: '10. Roadmap' },
  { id: 'monetization', label: '11. Monetization' },
  { id: 'business-model', label: '12. Business Model' },
  { id: 'conclusion', label: '13. Conclusion' },
]

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      let currentId: string | null = null

      tocItems.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          const offset = el.getBoundingClientRect().top
          if (offset < window.innerHeight * 0.3) {
            currentId = id
          }
        }
      })

      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="sticky top-24 max-w-xs space-y-2 p-4 text-sm text-gray-700 lg:block hidden">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Table of Contents</h3>
      <ul className="space-y-2">
        {tocItems.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={clsx(
                'transition-colors hover:text-primary',
                activeId === id ? 'font-semibold text-primary' : 'text-gray-600'
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
