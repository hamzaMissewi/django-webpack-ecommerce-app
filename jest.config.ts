/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { Config } from 'jest';

const config: Config = {
  transform: {
    '\\.[jt]s?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  transformIgnorePatterns: ['/node_modules/', '/src/', '/dist/'],
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  },
  testPathIgnorePatterns: ['node_modules', '<rootDir>/src/', '<rootDir>/dist/'],
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  globalSetup: './test/jest/setup.js',
  globalTeardown: './test/jest/teardown.js',
  snapshotResolver: './test/jest/snapshotResolver.cjs',
  setupFilesAfterEnv: ['./test/jest/config.js']
};

export default config;
