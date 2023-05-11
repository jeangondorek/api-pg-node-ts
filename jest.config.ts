/* eslint-disable linebreak-style */
export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: [
		'json'
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
