var closurify = require('../index'),
    through = require('through2'),
    es = require('event-stream'),
    should = require('should'),
    fs = require('fs'),
    gutil = require('gulp-util');

require("mocha");

describe("closurify", function() {
    it("should convert AMD to google closure style deps", function(done) {
        var file = new gutil.File({
            path: 'test/fixtures/module-a.js',
            cwd: 'test/',
            base: 'test/',
            contents: fs.createReadStream('test/fixtures/module-a.js')
        });
        
        var stream = closurify({baseUrl: './'});
        stream.on('data', function(newFile) {
            should.exist(newFile);
            should.exist(newFile.contents);

            newFile.pipe(es.wait(function(err, data) {
                should.not.exist(err);
                data.should.equal(fs.readFileSync('test/expected/module-a.js', 'utf8'));
                done();
            }));
        });
        stream.write(file);
        stream.end();
    });
});
