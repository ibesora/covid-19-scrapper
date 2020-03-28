const gulp = require('gulp');
const flowRemoveTypes = require('gulp-flow-remove-types');
const babel = require('gulp-babel');

gulp.task('build', function () {
    return gulp.src('./src/**/*.js')
        .pipe(flowRemoveTypes({pretty: true}))
        .pipe(babel({plugins: ['babel-plugin-unassert']}))
        .pipe(gulp.dest('./dist/'));
});