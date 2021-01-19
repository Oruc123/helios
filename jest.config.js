const DEFAULT_BASE_URL = 'http://foo.bar';
const TEST_BASE_URL = process.env.TEST_BASE_URL || DEFAULT_BASE_URL;

module.exports = {
  cache: true,
  cacheDirectory: '/tmp/jest-cache/',
  verbose: true,
  testURL: TEST_BASE_URL,
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|jpg|png)$': '<rootDir>/jest/mock-file.js'
  },

  testRegex: '.*\\.spec\\.(js|scss)$',

  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'bundle-loader?lazy!.']
};
