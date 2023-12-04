const config = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFiles: [
    './jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
}

module.exports = config
