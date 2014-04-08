var through = require('through2'),
    transform = require('amd-to-closure'),
    gutil = require('gulp-util');

module.exports = function(opts) {
    return through.obj(function(file, enc, cb) {
        var st = transform(file, {baseUrl: opts.baseUrl});
        st.on('data', function(text) { file.contents = new Buffer(text)});
        file.pipe(st);
        cb(null, file);
    });
}
