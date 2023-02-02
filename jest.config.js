module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.ts?$': 'babel-jest',
    '\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/.jest/setupTests.ts'],
  testRegex: '((test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svg.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js'
  },
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.ts(x)?']
}
