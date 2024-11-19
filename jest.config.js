module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^contracts/(.*)$': '<rootDir>/contracts/$1',
  },
  testTimeout: 10000
};