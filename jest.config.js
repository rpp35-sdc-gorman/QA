// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: false,
  testEnvironment: 'jsdom',
  setupFiles : ["./setup-jest.js"]
};

module.exports = config;
