const http = require('http');
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {};
// Looks strange but it's exactly from the docs

// Now let's initialize the object
const myEmitter = new Emitter();

const PORT = process.env.PORT  || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    let filePath;

    if(req.url === '/' || req.url === 'index.html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.end(data);
        })
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// myEmitter.on('log', (msg) => logEvents(msg));
//     // Emit event
//     myEmitter.emit('log', 'Log event emitted!');