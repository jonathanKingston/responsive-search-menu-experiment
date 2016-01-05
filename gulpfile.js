const gulp = require('gulp')
const postcss = require('gulp-postcss')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const babelify = require('babelify');
const browserify = require('browserify');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const fileinclude = require('gulp-file-include');
const  markdown = require('markdown');

var paths = {
  css: ['src/**/*.css'],
  scripts: ['src/**/*.js'],
  other: ['node_modules/open-iconic/**/*.svg', 'src/*.html']
};

gulp.task('clean', function () {
  return del(['build']);
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.other, ['other']);
});

gulp.task('css', function () {
  return (
    gulp.src('src/css/style.css')
    .pipe(postcss([
      require("postcss-import")(),
      require("postcss-url")(),
      require("postcss-nesting")(),
      require("postcss-cssnext")({
        features: {
          nesting: false
        }
      }),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]))
    .pipe(gulp.dest('build/css'))
  )
});

gulp.task('scripts', function() {
  var options = {
    presets: ['es2015']
  };
  var bundler = browserify('./src/js/script.js').transform(babelify, options);

  //return gulp.src(paths.scripts)
      //.pipe(babel(options))
  return bundler.bundle()
//    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(concat('script.min.js'))
 //   .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('other', function () {
  return (
    gulp.src(paths.other)
    .pipe(fileinclude({
      filters: {
        markdown: markdown.parse
      }
    }))
    .pipe(gulp.dest('build/'))
  )
});

gulp.task('build', function () {
  runSequence(
    ['clean'],
    ['scripts', 'other', 'css']
  )
});

gulp.task('build-watch', ['build', 'watch']);

gulp.task('default', ['build']);
