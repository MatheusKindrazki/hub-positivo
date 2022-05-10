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
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
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
