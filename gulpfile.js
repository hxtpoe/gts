var gulp = require('gulp');
var typescript = require('gulp-tsc');
var rjs = require('gulp-requirejs');

var paths = {
    scripts: ['src/**/*.ts']
};

gulp.task('compile', function () {
    gulp.src(paths.scripts)
        .pipe(typescript({
            emitError: false,
            target: "ES5",
            module: "amd"
        }))
        .pipe(gulp.dest('src/'))
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['compile', 'requirejsBuild']);
});


gulp.task('requirejsBuild', ['compile'], function () {
    rjs(
        {
            name: 'main',
            baseUrl: './src/',
            out: 'output',
            shim: {}
        }
    )
        .pipe(gulp.dest('./delpoy/')); // pipe it to the output DIR
});