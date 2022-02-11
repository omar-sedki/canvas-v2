'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');


function css() {
  return gulp.src('./src/css/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
};


function HTML() {
  return gulp.src('./src/index.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist/'));
};

function javascript() {
  return gulp.src('./src/js/canvas-v2.js')
  .pipe(fileinclude({prefix: '@@',basepath: '@file'}))
  .pipe(minify({preserveComments:"some"}))
  .pipe(gulp.dest('dist/js/'))

  
};


exports.watch= gulp.series( HTML,css,javascript, function () {
	
  gulp.watch('./src/**/*.scss', css);
  gulp.watch('./src/**/*.html', HTML);
  gulp.watch('./src/**/*.js', javascript);
  
});