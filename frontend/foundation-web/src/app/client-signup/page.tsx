'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Mark } from '@/components/logo'
import { Field, Input, Label } from '@headlessui/react'
import { clsx } from 'clsx'

export default function ClientSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('https://studio-backend.xalorra.com/create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, username }),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/client-login')
        }, 1500)
      } else {
        const data = await res.json()
        setError(data.detail || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form onSubmit={handleSubmit} className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <Mark className="h-9 fill-black" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">Register New Client</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Register to get your Client ID and start using the Studio.
            </p>

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Full Name</Label>
              <Input
                required
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>

            <Field className="mt-6 space-y-3">
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your active email"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>

            <Field className="mt-6 space-y-3">
              <Label className="text-sm/5 font-medium">Phone Number</Label>
              <Input
                required
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>

            <Field className="mt-6 space-y-3">
              <Label className="text-sm/5 font-medium">Username</Label>
              <Input
                required
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a unique username"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>

            {error && (
              <div className="mt-4 text-sm text-red-600">{error}</div>
            )}
            {success && (
              <div className="mt-4 text-sm text-green-600">
                Registration successful! Redirecting to login...
              </div>
            )}

            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register Client'}
              </Button>
            </div>
          </form>

          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Already have an account?{' '}
            <Link href="/client-login" className="font-medium hover:text-gray-600">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
