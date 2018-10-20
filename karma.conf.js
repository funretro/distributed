module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'node_modules/@babel/polyfill/dist/polyfill.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angularfire/dist/angularfire.min.js',
      'vendor/lvl-uuid.js',
      'vendor/lvl-drag-drop.js',
      'node_modules/ng-dialog/js/ngDialog.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/ng-file-upload/dist/ng-file-upload-all.min.js',
      'node_modules/papaparse/papaparse.min.js',
      'js/**/*.js',
      'test/**/*Test.js',
    ],

    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js/**/*.js': ['babel', 'coverage'],
      'test/**/*.js': ['babel'],
    },
    babelPreprocessor: {
      options: {
        presets: ['@babel/env'],
        sourceMap: 'inline',
      },
      filename(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName(file) {
        return file.originalPath;
      },
    },
    coverageReporter: {
      repoToken: 'QVdqIxSZvbUFLmSiYZ3uINtguZxhuBgy7',
      type: 'lcov',
      dir: 'coverage/',
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan', 'coverage'],
    browsers: ['PhantomJS'],
    client: {
      mocha: {
        reporter: 'html',
      },
    },
    port: 9876,
    colors: true,

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      'karma-babel-preprocessor',
      'karma-chai',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-nyan-reporter',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-chrome-launcher',
    ],
  });
};
