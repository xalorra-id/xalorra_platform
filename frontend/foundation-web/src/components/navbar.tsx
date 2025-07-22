'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  Transition,
} from '@headlessui/react'
import { Bars2Icon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'

const dropdownLinks = [
  {
    label: 'About',
    children: [
      { href: '/about/vision-mission', label: 'Vision & Mission' },
      { href: '/about/structure', label: 'Organizational Structure' },
      { href: '/about/principles', label: 'Community Principles' },
      { href: '/about/legal', label: 'Legal Information' },
    ],
  },
  {
    label: 'Explore',
    children: [
      { href: 'https://studio.xalorra.com', label: 'Xalorra Studio' },
      { href: 'https://aura.xalorra.com', label: 'Aura GenAI (Live Demo)' },
    ],
  },
  {
    label: 'Community',
    children: [
      { href: '/community/contribute', label: 'How to Contribute' },
      { href: '/community/guide', label: 'Contributor Guide' },
      { href: '/community/forum', label: 'Forum / Discord / Telegram' },
      { href: '/community/events', label: 'Community Events' },
    ],
  },
  {
    label: 'Blog',
    children: [
      { href: '/blog', label: 'Release News' },
      { href: '/blog/insight', label: 'Tech Insights' },
      { href: '/blog/community', label: 'Community Stories' },
    ],
  },
]

const staticLinks = [
  { href: '/whitepaper', label: 'Whitepaper' },
  { href: '/gitlab', label: 'GitLab' },
]

function DropdownMenu({
  label,
  children,
}: {
  label: string
  children: { href: string; label: string }[]
}) {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center gap-1 px-4 py-3 text-base font-medium text-gray-950 hover:bg-black/5">
            {label}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </motion.span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-50 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black/5">
              <div className="py-2">
                {children.map(({ href, label }) => (
                  <Menu.Item key={href}>
                    {({ active }) => (
                      <Link
                        href={href}
                        className={`block px-4 py-2 text-sm text-gray-950 ${active ? 'bg-gray-100' : ''}`}
                      >
                        {label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex items-center">
      {dropdownLinks.map(({ label, children }) => (
        <PlusGridItem key={label} className="relative flex">
          <DropdownMenu label={label}>
            {children}
          </DropdownMenu>
        </PlusGridItem>
      ))}
      {staticLinks.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 hover:bg-black/5"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
    </nav>
  )
}

function MobileNav() {
  const grouped = [...dropdownLinks, { label: '', children: staticLinks }]
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-4 py-4">
        {grouped.map((group, groupIndex) => (
          <div key={group.label || 'extra'}>
            {group.label && (
              <span className="block px-4 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                {group.label}
              </span>
            )}
            {group.children.map(({ href, label }, itemIndex) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: groupIndex * 0.1 + itemIndex * 0.05,
                }}
                key={href}
              >
                <Link
                  href={href}
                  className="block px-6 py-1 text-sm font-medium text-gray-800"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </DisclosurePanel>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg hover:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  )
}
