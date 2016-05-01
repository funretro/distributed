var gulp = require('gulp'),
jshint = require('gulp-jshint'),
Server = require('karma').Server,
concat = require('gulp-concat'),
gp_rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
concatCss = require('gulp-concat-css'),
uglifycss = require('gulp-uglifycss'),
sass = require('gulp-sass'),
connectlivereload = require('connect-livereload'),
express = require('express'),
path = require('path'),
watch = require('gulp-watch');

gulp.task('express', function() {
  var app = express();
  app.use(connectlivereload({ port: 35729 }));
  app.use(express.static('./dist'));
  var port = 4000;
  app.listen(port, '0.0.0.0', function(){
    console.log('App running and listening on port', port);
  });
});

var tinylr;

function notifyLiveReload(event) {
  tinylr.changed({ body: { files: [path.relative(__dirname, event.path)]}});
}

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

var bundleVendorCSS = function () {
  gulp.src(['node_modules/font-awesome/css/font-awesome.min.css',
	   'stylesheets/vendor/*.css'])
  .pipe(concatCss('vendor.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(uglifycss())
  .pipe(gulp.dest('dist/css'));
};

var processSass = function() {
  gulp.src(['stylesheets/main.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gp_rename('main.css'))
  .pipe(uglifycss())
  .pipe(gulp.dest('dist/css'));
};


var bundleVendorJS = function() {
  gulp.src(['node_modules/angular/angular.min.js',
	   'js/vendor/firebase.js',
	   'node_modules/angularfire/dist/angularfire.min.js',
	   'node_modules/angular-*/**/angular-*.min.js',
	   '!node_modules/**/angular-mocks.js',
	   'js/vendor/*.js',
	   'node_modules/ng-dialog/**/ngDialog*.min.js'])
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

};

var minifyJS = function () {
  gulp.src(['js/*.js',
	   'js/directives/*.js',
	   '!js/vendor/*.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
};

gulp.task('build', function() {
  bundleVendorCSS();
  bundleVendorJS();
  processSass();
  minifyJS();
});

gulp.task('watch', function (cb) {
  watch('dist/*', notifyLiveReload);
  watch('stylesheets/*.scss', sass);
  watch('js/**/*.js', minifyJS);
});

gulp.task('lint', function() {
  return gulp.src('./js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('testci', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('copy', function(){
  gulp.src('node_modules/roboto-fontface/fonts/*{Regular,Bold}.*')
  .pipe(gulp.dest('dist/fonts'));
  gulp.src('node_modules/font-awesome/fonts/*.{woff,woff2,eot,svg,ttf}')
  .pipe(gulp.dest('dist/fonts'));
  gulp.src('components/*')
  .pipe(gulp.dest('dist/components'));
  gulp.src('img/*')
  .pipe(gulp.dest('dist/img'));
  gulp.src('favicon.ico')
  .pipe(gulp.dest('dist'));
  gulp.src('firebase.json')
  .pipe(gulp.dest('dist'));
  gulp.src('README.md')
  .pipe(gulp.dest('dist'));
  gulp.src('CNAME')
  .pipe(gulp.dest('dist'));
  gulp.src('index.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build', 'copy', 'express', 'livereload', 'watch']);
