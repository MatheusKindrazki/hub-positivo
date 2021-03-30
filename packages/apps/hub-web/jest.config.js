const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  setupFilesAfterEnv: ['../../test-utils/setup.ts'],
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  collectCoverageFrom: [
    '<rootDir>/src/components/**/.tsx',
    '<rootDir>/src/layouts/**/.tsx',
    '<rootDir>/src/pages/**/.tsx',
    '<rootDir>/src/services/**/.tsx',
    '<rootDir>/src/validators/**/.tsx',
    '<rootDir>/src/middlewares/**/.ts',
    '<rootDir>/src/store/modules/**/.ts',
    '<rootDir>/src/utils/**/.ts',
    '<rootDir>/src/hooks/**/.{ts,tsx}',
    '!<rootDir>/**/*.mock.ts',
  ]
}
