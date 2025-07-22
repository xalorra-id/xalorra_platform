'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Mark } from '@/components/logo'
import { Checkbox, Field, Input, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
  
    try {
      const res = await fetch('http://103.164.54.246:8111/verify-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
  
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('client_id', data.client_id)
        window.location.href = 'http://103.164.54.246:3000/studio'
        
      } else {
        const data = await res.json()
        setError(data.detail || 'Invalid email or password. Please try again.')
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
            <h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Sign in to your account to continue.
            </p>

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                required
                autoFocus
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Password</Label>
              <Input
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>

            {error && (
              <div className="mt-4 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between text-sm/5">
              <Field className="flex items-center gap-3">
                <Checkbox
                  name="remember-me"
                  className={clsx(
                    'group block size-4 rounded border border-transparent shadow ring-1 ring-black/10 focus:outline-none',
                    'data-[checked]:bg-black data-[checked]:ring-black',
                    'data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black',
                  )}
                >
                  <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                </Checkbox>
                <Label>Remember me</Label>
              </Field>
              <Link href="/forgot-password" className="font-medium hover:text-gray-600">
                Forgot password?
              </Link>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Not a member?{' '}
            <Link href="/client-signup" className="font-medium hover:text-gray-600">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
