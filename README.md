Closurify
===================

Transform your amd modules to closure compiler dependency syntax.
Relies on [amd-to-closure](https://github.com/bramstein/amd-to-closure).

## Install
`npm install closurify`

## Usage
```javascript
var closurify = require('closurify');

gulp.src('src/**/*.js')
    .pipe(closurify({baseUrl: "./"}))
    .pipe(gulp.dest('./build'));

// If you want to write dependencies as well
var closureDeps = require('gulp-closure-deps'),
gulp.src(['src/**/*.js'])
    .pipe(closurify({baseUrl: './'}))
    .pipe(gulp.dest('./build'))
    .pipe(closureDeps({
        fileName: 'deps.js',
        prefix: '../../../'
    }))
    .pipe(gulp.dest('./build'));
```

Use [gulp-closure-deps](https://github.com/steida/gulp-closure-deps) to create dependencies file;

Example with different namespaces:
```javascript
gulp.task('transform', function() {
    gulp.src(['src/**/*.js'])
        .pipe(closurify({baseUrl: './'}))
        .pipe(gulp.dest('./build'))
        .pipe(closureDeps({
            fileName: 'deps.js',
            prefix: '../../../'
        }))
        .pipe(gulp.dest('./build'));

    gulp.src(['other-project/src/**/*.js'])
        .pipe(closurify({baseUrl: './'}))
        .pipe(gulp.dest('./build/other-project'))
        .pipe(closureDeps({
            fileName: 'deps.js',
            prefix: '../../../'
        }))
        .pipe(gulp.dest('./build/other-project'));
});
```
