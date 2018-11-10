var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var ejs = require('gulp-ejs');
var notify = require('gulp-notify');

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.{scss,sass,css}'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(notify('css task finished'))
});

gulp.task('scripts', function(){
  return gulp.src('src/javascript/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/javascript/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/javascript/'))
    .pipe(notify('js task finished'))
});

gulp.task('ejs',function(){
    gulp.src(['src/html/**/*.ejs'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(ejs({ msg: 'Hello Gulp!'}, {}, { ext: '.html' }))
        .pipe(gulp.dest('dist/html'))
        .pipe(notify('html task finished'))
});

gulp.task('run', ['styles', 'scripts', 'ejs']);

gulp.task('watch', function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/javascript/**/*.js", ['scripts']);
  gulp.watch("src/html/**/*.ejs", ['ejs']);
});

gulp.task('default', ['run', 'watch']);