'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('https://api.xalorra.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          tenant: 'tenant1', // ganti jika dinamis
        }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.access_token)
        router.push('/dashboard')
      } else {
        alert(data.detail || 'Login gagal')
      }
    } catch (err) {
      console.error('Login error:', err)
      alert('Terjadi kesalahan saat login')
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-16">
        {/* Left Panel */}
        <div className="col-span-6 mr-auto hidden flex-col justify-between lg:flex xl:mb-0">
          <a
            href="#"
            className="mb-6 inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white lg:mb-10"
          >
            <img className="mr-2 h-8 w-8" src="/assets/xalorra-logo.svg" alt="Xalorra" />
            Xalorra
          </a>
          <div className="flex">
            <svg className="mr-2 h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                Get started quickly
              </h3>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Integrate with developer-friendly APIs or choose low-code.
              </p>
            </div>
          </div>
          <div className="flex pt-8">
            <svg className="mr-2 h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                Support any business model
              </h3>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Host code that you don't want to share with the world in private.
              </p>
            </div>
          </div>
          <div className="flex pt-8">
            <svg className="mr-2 h-5 w-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white">
                Join millions of businesses
              </h3>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Xalorra is trusted by ambitious developers and small labs of every size.
              </p>
            </div>
          </div>
          <nav className="pt-10">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contact</a></li>
            </ul>
          </nav>
        </div>

        {/* Mobile Logo */}
        <div className="mb-6 text-center lg:hidden">
          <a href="#" className="inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mr-2 h-8 w-8" src="/assets/xalorra-logo.svg" alt="Xalorra" />
            Xalorra
          </a>
        </div>

        {/* Right Panel / Form */}
        <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow dark:bg-gray-800 sm:max-w-lg md:mt-0 xl:p-0">
          <Card className="shadow-none">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-2xl">
              Welcome back
            </h1>

            <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
              <Button color="gray" href="#" className="hover:bg-gray-50 dark:hover:bg-gray-700 md:w-1/2">
                Log in with Google
              </Button>
              <Button color="gray" href="#" className="hover:bg-gray-50 dark:hover:bg-gray-700 md:w-1/2">
                Log in with Apple
              </Button>
            </div>

            <div className="flex items-center my-6">
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
              <span className="px-5 text-gray-500 dark:text-gray-400">or</span>
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
            </div>

            <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="mb-2 block dark:text-white">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="mb-2 block dark:text-white">Password</Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <Checkbox id="remember-social" />
                  <Label htmlFor="remember-social" className="ml-3 text-sm text-gray-500 dark:text-gray-300">Remember me</Label>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full">Sign in to your account</Button>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Don’t have an account yet?&nbsp;
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up here
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
