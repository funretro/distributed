module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],

    files: [
      'js/vendor/angular.min.js',
      'js/vendor/angular-mocks.js',
      'js/vendor/angularfire.min.js',
      'js/vendor/firebase.js',
      'js/vendor/lvl-uuid.js',
      'js/vendor/lvl-drag-drop.js',
      'js/vendor/ngDialog.min.js',
      'js/vendor/sanitize.js',
      'js/*.js',
      'test/*Test.js',
    ],

    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js/*.js': ['coverage']
    },
    coverageReporter: {
      repoToken: 'QVdqIxSZvbUFLmSiYZ3uINtguZxhuBgy7',
      type: 'lcov',
      dir: 'coverage/'
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan', 'coverage', 'coveralls'],

    // web server port
    port: 9876,
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-coveralls',
      'karma-nyan-reporter',
      'karma-sinon',
    ]
  })
}
