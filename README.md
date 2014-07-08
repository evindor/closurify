Closurify
===================
[![build status](https://secure.travis-ci.org/evindor/closurify.png)](http://travis-ci.org/evindor/closurify)

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
        .pipe(closurify({baseUrl: './', namespace: 'project'}))
        .pipe(gulp.dest('./build'))
        .pipe(closureDeps({
            fileName: 'deps.js',
            prefix: '../../../'
        }))
        .pipe(gulp.dest('./build'));

    gulp.src(['other-project/src/**/*.js'])
        .pipe(closurify({baseUrl: './', namespace: 'otherProject'}))
        .pipe(gulp.dest('./build/other-project'))
        .pipe(closureDeps({
            fileName: 'deps.js',
            prefix: '../../../'
        }))
        .pipe(gulp.dest('./build/other-project'));
});
```

#### options.baseUrl
Base url for module naming

Type: `String`
Default: `"./"`

#### options.namespace
Prefix all modules with this namespace

Type: `String`
Default: ``
Example:
```javascript
    gulp.src(['src/**/*.js'])
        .pipe(closurify({baseUrl: './', namespace: 'project'}));

    // module-a.js
    define(function() {
        return 'module-a';
    });


    // After closurify
    goog.provide('project.module_a$$');
    project.module_a$$ = 'module-a';

```

#### options.foreignLibs
Do not resolve paths for some modules

Type: `Array`
Default: ``
Example:
```javascript
    gulp.src(['src/**/*.js'])
        .pipe(closurify({baseUrl: './', foreignLibs: ['proj2'], namespace: ['proj1']}));

    // module-a.js
    define(["module-b", "proj2/module-b"]function(ModuleB, OtherModuleB) {
        return 'module-a';
    });


    // After closurify
    goog.provide('proj1.module_a$$');
    goog.require('proj1.module_b$$');
    goog.require('proj2.module_b$$');
    proj1.module_a$$ = 'module-a';

    // Without foreignLibs option you would get
    goog.provide('proj1.module_a$$');
    goog.require('proj1.module_b$$');
    goog.require('proj1.proj2.module_b$$'); // You don't want this!
    proj1.module_a$$ = 'module-a';
```
