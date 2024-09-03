require('ts-node').register({
    transpileOnly: true
});

const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

module.exports = createJestConfig({
    testEnvironment: 'jest-environment-node',
    moduleDirectories: ['node_modules', '<rootDir>/'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['<rootDir>/__tests__/api-e2e/**/*.{test,spec}.ts']
});
