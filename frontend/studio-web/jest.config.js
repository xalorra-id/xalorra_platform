module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@xalorra/ui(.*)$': '<rootDir>/packages/ui/src',
    '^@xalorra/hooks(.*)$': '<rootDir>/packages/hooks/src',
    '^@xalorra/i18n(.*)$': '<rootDir>/packages/i18n/src',
    '^@xalorra/types(.*)$': '<rootDir>/packages/types/src',
    '^@xalorra/utils(.*)$': '<rootDir>/packages/utils/src'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.next/', '/storybook-static/'],
}
