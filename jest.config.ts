import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

// const tsJestTransformCfg = createDefaultPreset().transform;
// transform: {
// ...tsJestTransformCfg,
// },

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@routes/(.*)$': '<rootDir>/apps/api/src/routes/$1',
    '^@utils/(.*)$': '<rootDir>/apps/api/src/utils/$1',
    '^@middleware/(.*)$': '<rootDir>/apps/api/src/middleware/$1',
  },
};

export default config;
