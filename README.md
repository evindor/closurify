Closurify
===================

Transform your amd modules to closure compiler dependency syntax

## Install
`npm install closurify`

## Usage
```javascript
var closurify = require('closurify');

gulp.src('src/**/*.js')
    .pipe(closurify({baseUrl: "./"}))
    .pipe(gulp.dest('./build'));
```

Relies on [amd-to-closure](https://github.com/bramstein/amd-to-closure).
