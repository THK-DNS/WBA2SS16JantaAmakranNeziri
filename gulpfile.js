var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var watch = require("gulp-watch");
var shell = require("gulp-shell");
var gutil = require('gulp-util');

var dir = {
  src: 'src/**/**.js',
  dist: 'dist/',
  test: 'test/',
  docs: 'docs'
};

gulp.task('default', function() {
  return gulp.src(dir.src)
    .pipe(babel())
    .pipe(gulp.dest(dir.dist));
});

gulp.task('lint', function() {
  return gulp.src(dir.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('autoBuild:lint', function() {
  return gulp.src(dir.src)
    .pipe(watch(dir.src).on('change', function(path){
        gutil.log(`File ${gutil.colors.cyan(path.split('/').slice(-1)[0])} has been changed`);
        gulp.start('lint'); 
    }))
    .pipe(babel())
    .pipe(gulp.dest(dir.dist));
});