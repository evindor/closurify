var gulp = require('gulp'),
    closurify = require('../index');

gulp.task('closurify', function() {
    gulp.src('module-a.js')
        .pipe(closurify({baseUrl: './../'}))
        .pipe(gulp.dest('./out'));
});
