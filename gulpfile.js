var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  livereload = require('gulp-livereload'),
  rename = require("gulp-rename"),
  cleanCSS = require("gulp-clean-css"),
  sass = require('gulp-sass');

gulp.task('styles', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'safari 5', 'ios 6', 'android 4']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('styles/'))
});

gulp.task('deploy', ['styles'], () => {
  return gulp.src([
    "api/**",
    "bower_components/**",
    "images/**",
    "js/**",
    "plugins/**",
    "styles/*.css",
    "index.html"
  ], {base: "."}).pipe(gulp.dest("public/"))
});

gulp.task("watch", () => {
  livereload.listen();
  gulp.watch('styles/**', ['styles']);
});
