module.exports = {
  clearMocks: true,
  collectCoverage: true,
  verbose: false,
  testEnvironment: 'node',
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
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
