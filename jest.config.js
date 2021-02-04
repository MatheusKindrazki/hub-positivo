module.exports = {
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  collectCoverageFrom: [
    '<rootDir>/packages/**/.tsx',
    '<rootDir>/packages/**/.ts'
  ],
  projects: ['<rootDir>/packages/**/jest.config.js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  }
}
