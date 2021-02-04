module.exports = {
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  }
}
