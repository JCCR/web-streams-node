# web-streams-node
WhatWG web streams and conversion utilities for node.js

This provides the [WhatWG streams](https://streams.spec.whatwg.org) API for
node. It leverages the [WhatWG reference
implementation](https://github.com/whatwg/streams)

## Installation
```
npm install web-streams-node
```

## Usage
```javascript
// ES5 require syntax
var webStreams = require('web-streams-node');
var ReadableStream = webStreams.ReadableStream;
var toWebReadableStream = webStreams.toWebReadableStream;
var toNodeReadable = webStreams.toNodeReadable;

// ES6 import syntax
import { ReadableStream, toWebReadableStream, toNodeReadable } from "node-web-streams";

// Convert a node Readable to a web ReadableStream & back
const nodeReadable = require('fs').createReadStream('/tmp/test.txt');
const webReadable = toWebReadableStream(nodeReadable);
const roundTrippedNodeReadable = toNodeReadable(webReadable);
```

## Credits
Fork of [node-web-streams](https://github.com/gwicke/node-web-streams)

Original author:
 - Gabriel Wicke [gwicke](https://github.com/gwicke)
