const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/packages/playground',
    '<rootDir>/packages/in-memory-db',
    '<rootDir>/packages/playground-e2e',
    '<rootDir>/packages/spectator',
  ],
};
