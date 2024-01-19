const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
let c=0;
const requestListener = function (req,res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    c++;
    res.write('visitor count: '+c+'\n');
    res.end('Hello World\n Welcome to NodeJs');
}
const server = http.createServer(requestListener);
server.listen(port, hostname);
