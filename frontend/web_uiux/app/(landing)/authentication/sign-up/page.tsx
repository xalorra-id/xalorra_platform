'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Password tidak cocok.')
      return
    }

    if (!acceptTerms) {
      alert('Anda harus menyetujui Terms and Conditions.')
      return
    }

    // Ekstrak workspace_id dari email (sebelum @)
    const workspace_id = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') || 'default'

    try {
      const res = await fetch('https://api.xalorra.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password, workspace_id }),
      })

      if (!res.ok) {
        const errText = await res.text()
        alert('Signup gagal: ' + errText)
        return
      }

      const data = await res.json()

      // ✅ Simpan token ke localStorage
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('workspace_id', workspace_id)

      // ✅ Redirect ke dashboard setelah signup
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      alert('Terjadi kesalahan saat signup.')
    }
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 pt-8 md:h-screen">
      <Link
        href="/"
        className="mb-8 flex items-center justify-center text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <Image
          alt="Xalorra Logo"
          src="/images/logo.svg"
          width={43}
          height={44}
          className="mr-4 h-11"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Xalorra
        </span>
      </Link>

      <Card
        horizontal
        imgSrc="/images/authentication/create-account.jpg"
        imgAlt="Signup Illustration"
        className="w-full md:max-w-screen-lg"
        theme={{
          root: {
            children: 'my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16',
          },
          img: {
            horizontal: {
              on: 'hidden rounded-l-lg md:w-96 md:p-0 lg:block',
            },
          },
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
          Create a Free Account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <TextInput
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-x-3">
            <Checkbox
              id="acceptTerms"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
            <Label htmlFor="acceptTerms">
              I accept the{' '}
              <Link
                href="#"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Terms and Conditions
              </Link>
            </Label>
          </div>

          <div className="mb-7">
            <Button
              size="lg"
              color="blue"
              type="submit"
              className="w-full px-0 py-px sm:w-auto"
              theme={{ inner: { base: 'px-5 py-3' } }}
            >
              Create account
            </Button>
          </div>

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/authentication/sign-in"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}
