module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    collectCoverage: true,
    coverageReporters: ["json", "lcov", "text", "clover"],
  };
  