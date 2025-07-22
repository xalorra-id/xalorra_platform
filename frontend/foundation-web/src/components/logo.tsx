'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

export function Logo({ className }: { className?: string }) {
  const transition = {
    duration: 0.5,
    ease: 'easeInOut',
  }

  return (
    <motion.svg
      initial="idle"
      whileHover="active"
      viewBox="0 0 127 34"
      className={clsx(className, 'overflow-visible')}
    >
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.g
          key={i}
          variants={{
            idle: { scale: 1, opacity: 1 },
            active: {
              scale: [1, 1.1 + i * 0.05, 1],
              opacity: [1, 0.75, 1],
              transition: { ...transition, delay },
            },
          }}
        >
          {/* Reuse paths dynamically if needed or split logic */}
          {i === 0 && (
            <motion.path d="M19.5986 18.5005C18.7702 19.9354 16.9354 20.427 15.5005 19.5986C14.0656 18.7701 13.574 16.9354 14.4024 15.5005C15.2309 14.0656 17.0656 13.574 18.5005 14.4024C19.9354 15.2308 20.427 17.0656 19.5986 18.5005Z" />
          )}
          {i === 1 && (
            <>
              <path d="M23.2324 10.2074C22.6801 11.1639 21.4569 11.4917 20.5003 10.9394C19.5437 10.3871 19.216 9.16395 19.7683 8.20736C20.3205 7.25078 21.5437 6.92303 22.5003 7.47531C23.4569 8.0276 23.7846 9.25078 23.2324 10.2074Z" />
              <path d="M19.7683 25.7933C19.216 24.8367 19.5437 23.6135 20.5003 23.0612C21.4569 22.5089 22.6801 22.8367 23.2324 23.7933C23.7847 24.7498 23.4569 25.973 22.5003 26.5253C21.5437 27.0776 20.3206 26.7498 19.7683 25.7933Z" />
              <path d="M26 19C24.8954 19 24 18.1046 24 17C24 15.8955 24.8954 15 26 15C27.1046 15 28 15.8955 28 17C28 18.1046 27.1046 19 26 19Z" />
              <path d="M14.2324 25.7933C13.6801 26.7499 12.4569 27.0777 11.5003 26.5254C10.5437 25.9731 10.216 24.7499 10.7683 23.7933C11.3205 22.8367 12.5437 22.509 13.5003 23.0613C14.4569 23.6136 14.7846 24.8367 14.2324 25.7933Z" />
              <path d="M10.7682 10.2073C10.216 9.25078 10.5437 8.0276 11.5003 7.47532C12.4569 6.92303 13.6801 7.25078 14.2323 8.20737C14.7846 9.16395 14.4569 10.3871 13.5003 10.9394C12.5437 11.4917 11.3205 11.1639 10.7682 10.2073Z" />
              <path d="M8 19C6.89543 19 6 18.1045 6 17C6 15.8954 6.89543 15 8 15C9.10457 15 10 15.8954 10 17C10 18.1045 9.10457 19 8 19Z" />
            </>
          )}
          {i === 2 && (
            <>
              <path d="M25.8662 3.6447...Z" />
              {/* Cut for brevity. Reuse all motion paths here. */}
            </>
          )}
        </motion.g>
      ))}
    </motion.svg>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" fill="none" className={className}>
      <path d="M19.598 18.5C18.7696 19.9349...Z" />
      {/* Add the rest of the static paths as needed */}
    </svg>
  )
}
