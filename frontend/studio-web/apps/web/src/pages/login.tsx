'use client'

import { BlockBreadcrumb } from '../components/block-breadcrumb'
import { BlockSection } from '../components/block-section'
import { SocialMediaLoginForm } from '../login-forms/social-media';

export default function SocialLoginPage() {
  return (
    <>
      <BlockBreadcrumb
        title="Social Media Login"
        description="Authenticate users using their social accounts such as Google, Apple, GitHub, or Twitter with this example login form."
      />
      <BlockSection
        title="Login with Social Media"
        description="This login form allows users to sign in using their social media credentials."
        githubLink="https://github.com/themesberg/flowbite-react-blocks/blob/main/pages/marketing-ui/login-forms/social-media.tsx"
      >
        <SocialMediaLoginForm />
      </BlockSection>
    </>
  )
}
