module.exports = {
  clearMocks: true,
  collectCoverage: true,
  verbose: false,
  testEnvironment: 'node',
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: true
    }
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  }
}
