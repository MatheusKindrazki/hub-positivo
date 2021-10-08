module.exports = {
  clearMocks: true,
  verbose: false,
  testEnvironment: 'node',
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  coverageReporters: [
    'text',
    'html',
    'lcov',
    'json-summary',
    'clover',
    'cobertura'
  ],
  setupFilesAfterEnv: ['<rootDir>/packages/libs/test-utils/setup.ts'],
  transformIgnorePatterns: ['node_modules'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: true,
      isolatedModules: true
    }
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  }
}
