module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^contracts/(.*)$': '<rootDir>/contracts/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  testTimeout: 10000,
  transformIgnorePatterns:[
    'node_modules/(?!(@t3-oss/env-nextjs)/)',
   ],
   transform: {
     '^.+\\.ts$': 'babel-jest'
   },
   globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      useESM: true,
    },
   }
};