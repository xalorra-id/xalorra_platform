#!/bin/bash
set -e

PROJECT_NAME="xalorra-frontend"
APPS=("web")
PACKAGES=("ui" "hooks" "i18n" "types" "utils")

# === SAFE: Cek dulu kalau folder sudah ada ===
if [ -d "$PROJECT_NAME" ]; then
  echo "Folder $PROJECT_NAME sudah ada. Hapus dulu atau ganti nama project."
  exit 1
fi

# 1. Create main project folder & move into it
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME"

# 2. Init pnpm workspace & git
pnpm init
git init

# 3. Create pnpm-workspace.yaml SEBELUM install turbo!
cat > pnpm-workspace.yaml <<EOL
packages:
  - "apps/*"
  - "packages/*"
EOL

# 4. Baru install TurboRepo (recommended for scale)
pnpm add -w turbo

# 5. Create .gitignore
cat > .gitignore <<EOL
node_modules/
.next/
dist/
.env
.DS_Store
coverage/
storybook-static/
EOL

# 6. Root tsconfig.json (Best Practice)
cat > tsconfig.json <<EOL
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@xalorra/ui": ["packages/ui/src/index.ts"],
      "@xalorra/hooks": ["packages/hooks/src/index.ts"],
      "@xalorra/i18n": ["packages/i18n/src/index.ts"],
      "@xalorra/types": ["packages/types/src/index.ts"],
      "@xalorra/utils": ["packages/utils/src/index.ts"]
    }
  },
  "exclude": ["node_modules", "dist", ".next"]
}
EOL

# 7. Create apps and packages structure
mkdir -p apps
for APP in "${APPS[@]}"; do
  npx create-next-app@latest apps/$APP --typescript --tailwind --src-dir --import-alias="@/*" --no-eslint --no-app
  # tsconfig untuk apps/web
  cat > apps/$APP/tsconfig.json <<EOL
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
    "types": ["node"],
    "baseUrl": ".",
    "paths": {
      "@xalorra/ui": "../../packages/ui/src/index.ts",
      "@xalorra/hooks": "../../packages/hooks/src/index.ts"
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOL
done

mkdir -p packages
for PKG in "${PACKAGES[@]}"; do
  mkdir -p packages/$PKG/src
  touch packages/$PKG/README.md
  # tsconfig khusus per package
  case $PKG in
    ui)
      cat > packages/ui/tsconfig.json <<EOL
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": false,
    "baseUrl": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "test", "*.test.tsx"]
}
EOL
      cat > packages/ui/README.md <<EOL
# Xalorra UI
Komponen UI reusable untuk Xalorra (Button, Card, Table, dsb.)
EOL
      cat > packages/ui/src/Button.tsx <<EOL
import React from "react";
export const Button = ({ children, ...props }) => (
  <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition" {...props}>
    {children}
  </button>
);
EOL
      cat > packages/ui/src/index.ts <<EOL
export * from "./Button";
EOL
      ;;
    types)
      cat > packages/types/tsconfig.json <<EOL
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOL
      echo "# Xalorra Types" > packages/types/README.md
      ;;
    utils)
      cat > packages/utils/tsconfig.json <<EOL
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "strict": false,
    "noImplicitAny": false,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOL
      echo "# Xalorra Utils" > packages/utils/README.md
      ;;
    hooks)
      cat > packages/hooks/tsconfig.json <<EOL
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOL
      echo "# Xalorra Hooks" > packages/hooks/README.md
      ;;
    i18n)
      cat > packages/i18n/tsconfig.json <<EOL
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "strict": true,
    "declaration": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOL
      echo "# Xalorra I18N" > packages/i18n/README.md
      ;;
  esac
  # index.ts di setiap package biar ready
  if [ ! -f packages/$PKG/src/index.ts ]; then
    touch packages/$PKG/src/index.ts
  fi
done

# 8. LICENSE & CODE OF CONDUCT & CONTRIBUTING
cat > LICENSE <<EOL
MIT License

Copyright (c) $(date +%Y)

Permission is hereby granted, free of charge, to any person obtaining a copy...
(replace this with full MIT text from choosealicense.com)
EOL

cat > CODE_OF_CONDUCT.md <<EOL
# Contributor Covenant Code of Conduct

## Our Pledge
We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone...
EOL

cat > CONTRIBUTING.md <<EOL
# Contributing to Xalorra

Thanks for your interest in contributing! Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before you begin.

## Workflow
- Fork & clone this repo
- Buat branch fitur/bugfix baru dari \`main\`
- Commit kode, pastikan sudah di-lint, test & format
- Push & buat Pull Request
EOL

# 9. Prettier & ESLint config (root)
pnpm add -w -D prettier eslint eslint-config-next eslint-plugin-prettier eslint-config-prettier
cat > .prettierrc <<EOL
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
EOL
cat > .prettierignore <<EOL
node_modules
.next
dist
coverage
storybook-static
EOL
cat > .eslintrc.json <<EOL
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
EOL

# 10. Testing (Jest) basic setup
pnpm add -w -D jest @types/jest ts-jest
cat > jest.config.js <<EOL
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@xalorra/ui(.*)$': '<rootDir>/packages/ui/src$1',
    '^@xalorra/hooks(.*)$': '<rootDir>/packages/hooks/src$1',
    '^@xalorra/i18n(.*)$': '<rootDir>/packages/i18n/src$1',
    '^@xalorra/types(.*)$': '<rootDir>/packages/types/src$1',
    '^@xalorra/utils(.*)$': '<rootDir>/packages/utils/src$1'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.next/', '/storybook-static/'],
}
EOL

cat > packages/ui/src/Button.test.tsx <<EOL
import { render } from '@testing-library/react'
import { Button } from './Button'

test('Button renders children', () => {
  const { getByText } = render(<Button>Test</Button>)
  expect(getByText('Test')).toBeInTheDocument()
})
EOL

pnpm add -w -D @testing-library/react @testing-library/jest-dom

# 11. Storybook setup (for UI package)
cd packages/ui
pnpm add -D storybook @storybook/react @storybook/addon-actions @storybook/addon-essentials @storybook/addon-interactions @storybook/testing-react
npx storybook init --builder vite || true
cat > .storybook/main.ts <<EOL
import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
};
export default config;
EOL
cat > src/Button.stories.tsx <<EOL
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
  },
};
EOL
cd ../../

# 12. CI/CD (GitHub Actions) setup
mkdir -p .github/workflows
cat > .github/workflows/ci.yml <<EOL
name: CI

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Install deps
        run: pnpm install
      - name: Lint
        run: pnpm eslint .
      - name: Test
        run: pnpm jest
EOL

# 13. Create placeholder README and .env in root
cat > README.md <<EOL
# Xalorra Frontend (Next.js OSS Monorepo)

## Struktur
- \`apps/web/\` — Next.js app utama (UI Xalorra)
- \`packages/ui/\` — Komponen UI reusable (Button, Card, dsb.)
- \`packages/hooks/\` — Custom hooks React
- \`packages/i18n/\` — Resource multi-bahasa
- \`packages/types/\` — TypeScript interface/type
- \`packages/utils/\` — Helper function umum

## Setup
\`\`\`sh
pnpm install
cd apps/web
pnpm dev
\`\`\`

## Fitur Siap Pakai:
- Linter: ESLint + Prettier (root)
- Testing: Jest + Testing Library
- Storybook: di packages/ui
- CI/CD: GitHub Actions (lint & test tiap PR/Push)
- LICENSE, CONTRIBUTING, CODE OF CONDUCT

## Kontribusi
- Fork/clone, buat branch, commit & PR
- Tambahkan komponen di packages/ui atau packages lain sesuai kebutuhan
- Dokumentasi tiap package ada di README masing-masing

EOL

cat > .env <<EOL
NEXT_PUBLIC_API_URL=https://api.xalorra.com
EOL

# 14. Cek & Install tree kalau belum ada (Linux)
if ! command -v tree &> /dev/null
then
    echo "tree tidak ditemukan, menginstall..."
    sudo apt-get update && sudo apt-get install -y tree
fi

echo ""
echo "======================================"
echo "Xalorra Frontend Monorepo Created! (Ultimate OSS Ready)"
echo "Structure:"
tree -L 3 || ls
echo ""
echo "Next steps:"
echo "1. cd $PROJECT_NAME"
echo "2. pnpm install"
echo "3. pnpm lint"
echo "4. pnpm test"
echo "5. cd apps/web && pnpm dev"
echo ""
echo "Fitur:"
echo "- Linter & Prettier"
echo "- Testing (Jest + Testing Library)"
echo "- Storybook (cd packages/ui && pnpm storybook)"
echo "- CI/CD: Lint & Test (GitHub Actions)"
echo "- LICENSE, Code of Conduct, Contributing Guide"
echo ""
echo "Sudah siap open-source/OSS development! 🚀"
echo ""
echo "======================================"
