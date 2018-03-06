var test = require('tape');
var fs = require('fs');
var Readable = require('stream').Readable;
var webStreams = require('./index');
var toWebReadableStream = webStreams.toWebReadableStream;
var toNodeReadable = webStreams.toNodeReadable;

test('Convert a node Readable to a web ReadableStream & back', function (t) {
    var nodeReadable = new Readable();
    const webReadable = toWebReadableStream(nodeReadable);
    const roundTrippedNodeReadable = toNodeReadable(webReadable);
    roundTrippedNodeReadable.on('data', function(data) {
        t.equal(data.toString(), 'foobar');
    });
    roundTrippedNodeReadable.on('end', function() {
        t.end();
    });
    nodeReadable.push('foobar');
    nodeReadable.push(null);
});