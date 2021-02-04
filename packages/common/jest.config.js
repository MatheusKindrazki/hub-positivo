const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  preset: 'ts-jest',
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1"
  },
  collectCoverageFrom: [
    '<rootDir>/packages/**/.tsx',
    '<rootDir>/packages/**/.ts'
  ],
};
