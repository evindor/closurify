var through = require('through2'),
    transform = require('amd-to-closure');

module.exports = function(opts) {
    return through.obj(function(file, enc, cb) {
        var st = transform(file, {
            baseUrl: opts.baseUrl,
            namespace: opts.namespace,
            foreignLibs: opts.foreignLibs
        });
        st.on('data', function(text) {
            file.contents = new Buffer(text);
            cb(null, file);        
        });
        file.pipe(st);
    });
}
