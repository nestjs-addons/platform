/* eslint-disable */
export default {
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  coverageDirectory: '../../coverage/packages/playground-e2e',
  displayName: 'playground-e2e',
};
