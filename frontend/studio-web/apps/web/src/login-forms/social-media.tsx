'use client'

import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'

export function SocialMediaLoginForm() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-16">
        <div className="col-span-6 mr-auto hidden flex-col justify-between lg:flex xl:mb-0">
          <div>
            <a
              href="#"
              className="mb-6 inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white lg:mb-10"
            >
              <img
                className="mr-2 h-8 w-8"
                src="/assets/xalorra-logo.svg"
                alt="Xalorra"
              />
              Xalorra
            </a>
            <div className="flex">
              <svg className="mr-2 h-5 w-5 shrink-0 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
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
              <svg className="mr-2 h-5 w-5 shrink-0 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
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
              <svg className="mr-2 h-5 w-5 shrink-0 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
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
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400 dark:hover:text-white">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400 dark:hover:text-white">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400 dark:hover:text-white">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className="mb-6 text-center lg:hidden">
          <a href="#" className="inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mr-2 h-8 w-8" src="/assets/xalorra-logo.svg" alt="Xalorra" />
            Xalorra
          </a>
        </div>

        <div className="col-span-6 mx-auto w-full rounded-lg bg-white shadow dark:bg-gray-800 sm:max-w-lg md:mt-0 xl:p-0">
          <Card className="shadow-none">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-2xl">
              Welcome back
            </h1>

            <div className="items-center space-y-3 sm:flex sm:space-x-4 sm:space-y-0">
              <Button color="gray" href="#" className="hover:bg-gray-50 dark:hover:bg-gray-700 md:w-1/2">
                {/* Google Logo */}
                <svg className="mr-2 h-5 w-5" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.3 10.2c0-.7-.1-1.4-.2-2H10.7v3.8h5.4c-.2 1.2-.9 2.3-1.9 3v2.5h3.2c1.9-1.8 2.9-4.3 2.9-7.3z" fill="#3F83F8" />
                  <path d="M10.7 20c2.7 0 5-0.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4H1.8v2.6C3.5 17.9 6.9 20 10.7 20z" fill="#34A853" />
                  <path d="M5.1 11.9c-.4-1.2-.4-2.6 0-3.8V5.5H1.8c-1.4 2.8-1.4 5.8 0 8.5l3.3-2.1z" fill="#FBBC04" />
                  <path d="M10.7 4c1.4 0 2.7.5 3.8 1.5l2.9-2.9C15.6 0.9 13.2 0 10.7 0 6.9 0 3.5 2.1 1.8 5.5l3.3 2.5C6 6.6 8.1 4 10.7 4z" fill="#EA4335" />
                </svg>
                Log in with Google
              </Button>

              <Button color="gray" href="#" className="hover:bg-gray-50 dark:hover:bg-gray-700 md:w-1/2">
                {/* Apple Logo */}
                <svg className="mr-2 h-5 w-5 text-gray-900 dark:text-white" viewBox="0 0 21 20" fill="currentColor">
                  <path d="M18.7 15.6c-.3.7-.6 1.3-1 1.9-.6.8-1 1.4-1.4 1.7-.6.5-1.2.8-1.8.8-.5 0-1.1-.1-1.7-.4s-1.2-.4-1.8-.4c-.6 0-1.2.1-1.8.4-.6.2-1.1.4-1.5.4-.6 0-1.2-.3-1.8-.8-.4-.3-.8-.8-1.4-1.7-.6-.9-1.1-1.9-1.5-3-.4-1.2-.6-2.4-.6-3.6 0-1.3.3-2.4.8-3.3.5-.8 1.1-1.4 1.8-1.8.7-.4 1.4-.6 2.2-.6.5 0 1.2.1 1.9.4s1.1.4 1.3.4c.2 0 .8-.2 1.8-.6.9-.3 1.7-.5 2.3-.4 1.7.1 3 .9 3.7 2.1-1.5.9-2.2 2.2-2.2 4.1 0 1.3.4 2.4 1.2 3.3.4.4.9.7 1.4.9zM14.8.4c0 1-.4 2-.9 2.7-.8.9-1.8 1.4-3 1.3 0-.1 0-.2 0-.3 0-1 .4-2 .9-2.6.4-.5 1-.9 1.6-1.2C14.3.1 14.6 0 14.8 0v.4z" />
                </svg>
                Log in with Apple
              </Button>
            </div>

            <div className="flex items-center my-6">
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
              <span className="px-5 text-gray-500 dark:text-gray-400">or</span>
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
            </div>

            <form className="space-y-4 lg:space-y-6" action="#">
              <div>
                <Label htmlFor="email" className="mb-2 block dark:text-white">Email</Label>
                <TextInput id="email" placeholder="Enter your email" required type="email" />
              </div>
              <div>
                <Label htmlFor="password" className="mb-2 block dark:text-white">Password</Label>
                <TextInput id="password" placeholder="••••••••" required type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <Checkbox id="remember-social" required />
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
