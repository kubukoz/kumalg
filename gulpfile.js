var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  livereload = require('gulp-livereload'),
  rename = require("gulp-rename"),
  cleanCSS = require("gulp-clean-css"),
  sass = require('gulp-sass');

gulp.task('styles', function () {
  livereload.listen();
  return gulp.src('styles/*.scss')
    .pipe(sass({
      onError: function (err) {
        console.log(err);
      }
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'safari 5', 'ios 6', 'android 4']
    }))
    .pipe(cleanCSS())
    .pipe(livereload())
    .pipe(gulp.dest('styles/'))
});

gulp.task("watch", function () {
  livereload.listen();
  gulp.watch('styles/**', ['styles']);
});
