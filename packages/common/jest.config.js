const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1"
  },
  collectCoverageFrom: [
    '<rootDir>/components/**/.tsx',
    '<rootDir>/utils/**/.ts',
  ],
};
