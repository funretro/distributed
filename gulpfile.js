const gulp = require('gulp');

const clean = require('gulp-clean');

const Server = require('karma').Server;

const concat = require('gulp-concat');

const gp_rename = require('gulp-rename');

const uglify = require('gulp-uglify');

const concatCss = require('gulp-concat-css');

const uglifycss = require('gulp-uglifycss');

const sass = require('gulp-sass');

const connectlivereload = require('connect-livereload');

const express = require('express');

const path = require('path');

const watch = require('gulp-watch');

const autoprefixer = require('gulp-autoprefixer');

gulp.task('express', () => {
  const app = express();
  app.use(connectlivereload({ port: 35729 }));
  app.use(express.static('./dist'));
  const port = 4000;
  app.listen(port, '0.0.0.0', () => {
    console.log('App running and listening on port', port);
  });
});

let tinylr;

function notifyLiveReload(event) {
  tinylr.changed({ body: { files: [path.relative(__dirname, event.path)] } });
}

gulp.task('livereload', () => {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

const buildHTML = function() {
  gulp.src('index.html').pipe(gulp.dest('dist'));
  gulp.src('components/*').pipe(gulp.dest('dist/components'));
};

const bundleVendorCSS = function() {
  gulp
    .src([
      'node_modules/font-awesome/css/font-awesome.min.css',
      'stylesheets/vendor/*.css',
    ])
    .pipe(concatCss('vendor.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/css'));
};

const processSass = function() {
  gulp
    .src(['stylesheets/main.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gp_rename('main.css'))
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/css'));
};

const bundleVendorJS = function() {
  gulp
    .src([
      'js/vendor/jquery-3.2.1.min.js',
      'node_modules/angular/angular.min.js',
      'js/vendor/firebase.js',
      'js/vendor/firebaseInitialization.js',
      'node_modules/angularfire/dist/angularfire.min.js',
      'node_modules/angular-*/**/angular-*.min.js',
      'node_modules/core-js/client/shim.min.js',
      '!node_modules/**/angular-mocks.js',
      'js/vendor/*.js',
      'node_modules/ng-dialog/**/ngDialog*.min.js',
      'node_modules/ng-file-upload/**/ng-file-upload-all.min.js',
      'node_modules/papaparse/papaparse.min.js',
      'node_modules/clipboard/dist/clipboard.min.js',
      'node_modules/vanilla-emoji-picker/dist/emojiPicker.min.js',
      'node_modules/jspdf/dist/jspdf.min.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
};

const minifyJS = function() {
  gulp
    .src(['js/*.js', 'js/**/*.js', '!js/vendor/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
};

gulp.task('clean-dist', () =>
  gulp.src('dist/*', { read: false }).pipe(clean())
);

gulp.task('bundle', () => {
  bundleVendorCSS();
  bundleVendorJS();
  processSass();
  minifyJS();
});

gulp.task('watch', cb => {
  watch('dist/*', notifyLiveReload);
  watch('**/*.html', notifyLiveReload);
  watch('components/*', buildHTML);
  watch('**/*.scss', processSass);
  watch('**/*.scss', notifyLiveReload);
  watch('js/**/*.js', minifyJS);
});
gulp.task('watch-test', done =>
  new Server(
    {
      configFile: `${__dirname}/karma.conf.js`,
      singleRun: false,
    },
    done
  ).start()
);

gulp.task('test-once', done => {
  Server.start(
    {
      configFile: `${__dirname}/karma.conf.js`,
      singleRun: true,
      reporters: ['mocha'],
    },
    error => {
      done(error);
    }
  );
});

gulp.task('copy', () => {
  gulp
    .src('node_modules/roboto-fontface/fonts/*{Regular,Bold}.*')
    .pipe(gulp.dest('dist/fonts'));
  gulp
    .src('node_modules/font-awesome/fonts/*.{woff,woff2,eot,svg,ttf}')
    .pipe(gulp.dest('dist/fonts'));
  gulp.src('img/*').pipe(gulp.dest('dist/img'));
  gulp.src('favicon.ico').pipe(gulp.dest('dist'));
  gulp.src('firebase.json').pipe(gulp.dest('dist'));
  gulp.src('README.md').pipe(gulp.dest('dist'));
  gulp.src('CNAME').pipe(gulp.dest('dist'));

  buildHTML();
});

gulp.task('default', ['bundle', 'copy', 'express', 'livereload', 'watch']);
gulp.task('test', ['watch-test']);
gulp.task('testci', ['test-once']);
gulp.task('build', ['clean-dist', 'bundle', 'copy']);
