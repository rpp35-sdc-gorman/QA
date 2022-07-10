// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  // testEnvironment: 'jsdom',
  transformIgnorePatterns: ["/node_modules/(?!(foo|bar)/)", "/bar/"]
};

module.exports = config;
