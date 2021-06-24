const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.ts'

  },
 
  transformIgnorePatterns: ['node_modules'],
  collectCoverageFrom: [
    '<rootDir>/components/**/.tsx',
    '<rootDir>/utils/**/.ts',
  ],
}
