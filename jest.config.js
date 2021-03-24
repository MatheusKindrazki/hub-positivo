module.exports = {
  clearMocks: true,
  verbose: false,
  testEnvironment: 'node',
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
  setupFilesAfterEnv: ['<rootDir>/packages/test-utils/setup.ts'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  }
}
