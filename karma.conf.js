require('babel/register');

module.exports = function generateConfig(config) {
  config.set({
    browserNoActivityTimeout: 60000,
    browsers: [ process.env.CONTINOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],
    singleRun: process.env.CONTINOUS_INTEGRATION === 'true',
    frameworks: [ 'mocha' ],
    files: [
      'tests.js',
    ],
    preprocessors: {
      'tests.js': [ 'webpack', 'sourcemap' ],
    },
    reporters: [ 'mocha' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
    ],
    webpack: require('./webpack.config.test'),
    webpackServer: {
      noInfo: true,
    },
  });
};
