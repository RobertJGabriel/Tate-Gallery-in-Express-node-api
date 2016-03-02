var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    console.log("starting");
    return gulp.src('public/css/scss/bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});



// Default Task
gulp.task('default', ['sass']);
