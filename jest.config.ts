/* eslint-disable linebreak-style */
export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: [
		'json',
	],
	collectCoverageFrom: [
		'<rootDir>/packages/**/*.{tsx,ts}',
		'!**/*.{js,d.ts}'
	],
	setupFiles: [
		'./tests/jest.setup.ts'
	],
	testMatch: [
		'<rootDir>/tests/**/*.test.ts'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
};
