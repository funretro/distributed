var gulp = require('gulp'),
jshint = require('gulp-jshint'),
Server = require('karma').Server,
gp_concat = require('gulp-concat'),
gp_rename = require('gulp-rename'),
gp_uglify = require('gulp-uglify'),
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
  app.use(express.static(__dirname));
  app.listen(4000, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

function notifyLiveReload(event) {
  tinylr.changed({ body: { files: [path.relative(__dirname, event.path)]}});
}

gulp.task('watch', function (cb) {
  watch('*.html', notifyLiveReload);
  watch('dist/*.css', notifyLiveReload);
  watch('dist/*.js', notifyLiveReload);

  watch('stylesheets/vendor/*.css', function () {
    gulp.src(['stylesheets/vendor/*.css'])
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('dist'))
    .pipe(gp_rename('vendor.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('dist'));
  });

  watch('stylesheets/*.scss', function() {
    gulp.src(['stylesheets/main.scss'])
      .pipe(sass())
      .pipe(gp_rename('main.css'))
      .pipe(uglifycss())
      .pipe(gulp.dest('dist'));
  });

  watch('js/**/*.js', function () {
    gulp.src(['!js/vendor/angular-mocks.js','js/vendor/*.js', 'js/*.js', 'js/directives/*.js'])
    .pipe(gp_concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gp_rename('main.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('dist'));
  });
});

gulp.task('lint', function() {
  return gulp.src('./js/*.js')
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
  gulp.src('node_modules/roboto-fontface/fonts/*Regular.*')
  .pipe(gulp.dest('dist/fonts'));
  gulp.src('node_modules/roboto-fontface/fonts/*Bold.*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['copy', 'express', 'livereload', 'watch']);
