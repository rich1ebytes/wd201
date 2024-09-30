const http = require('http');
const fs = require('fs');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const port = args.port || 3000; 

function servePage(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404: Page Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        servePage(res, 'home.html');
    } else if (req.url === '/projects') {
        servePage(res, 'project.html');
    } else if (req.url === '/registration') {
        servePage(res, 'registration.html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: Page Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
