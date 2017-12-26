const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// Transpile javascript to es6
gulp.task('es6', () => {
    gulp.src('src/js/script.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('src/build/js'));
});

// Transpile sass to css
gulp.task('sass', () => {
    gulp.src('src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/build/css'));
});

// Watch
gulp.task('watch', () => {
    gulp.watch('src/js/*.js', ['es6']);
    gulp.watch('src/sass/*.scss', ['sass']);
});