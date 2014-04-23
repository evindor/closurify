var closurify = require('../index'),
    through = require('through2'),
    es = require('event-stream'),
    should = require('should'),
    fs = require('fs'),
    gutil = require('gulp-util');

require("mocha");

describe("closurify", function() {
    it("should convert AMD to google closure style deps", function(done) {
        test('test/fixtures/module-a.js', {baseUrl: './'}, done);
    });

    it("should support global namespace and foreign libs options", function(done) {
        test('test/fixtures/module-c.js', {baseUrl: './', namespace: 'glob', foreignLibs: ['xlib']}, done);
    });
});

function test(file, options, done) {
    var f = new gutil.File({
        path: file,
        cwd: './',
        base: './',
        contents: fs.createReadStream(file)
    });

    var stream = closurify(options);
    stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.pipe(es.wait(function(err, data) {
            should.not.exist(err);
            data.should.equal(fs.readFileSync(file.replace('fixtures', 'expected'), 'utf8'));
            done();
        }));
    });
    stream.write(f);
    stream.end();
}
