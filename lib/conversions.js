'use strict';

const Readable = require('stream').Readable;
const ReadableStream = require('web-streams-ponyfill').ReadableStream;

/**
 * Web / node stream conversion functions
 */
global.ReadableStream = global.ReadableStream || ReadableStream;
// TODO: The module 'readable-stream-node-to-web' expects `ReadableStream` in globals
const readableNodeToWeb = require('readable-stream-node-to-web');

/**
 * ReadableStream wrapping an array.
 *
 * @param {Array} arr, the array to wrap into a stream.
 * @return {ReadableStream}
 */
function arrayToWeb(arr) {
    return new ReadableStream({
        start(controller) {
            for (var i = 0; i < arr.length; i++) {
                controller.enqueue(arr[i]);
            }
            controller.close();
        }
    });
}


class NodeReadable extends Readable {
    constructor(webStream, options) {
        super(options);
        this._webStream = webStream;
        this._reader = webStream.getReader();
        this._reading = false;
    }

    _read(size) {
        if (this._reading) {
            return;
        }
        this._reading = true;
        const doRead = () => {
            this._reader.read()
                .then(res => {
                    if (res.done) {
                        this.push(null);
                        return;
                    }
                    if (this.push(res.value)) {
                        return doRead(size);
                    } else {
                        this._reading = false;
                    }
                });
        };
        doRead();
    }
}

function readableWebToNode(webStream) {
    return new NodeReadable(webStream);
}

module.exports = {
    readable: {
        nodeToWeb: readableNodeToWeb,
        arrayToWeb: arrayToWeb,
        webToNode: readableWebToNode,
    },
};
