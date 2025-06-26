const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/favicon.ico');
});

app.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/index.css');
});

io.on('connection', (socket) => {
    var ip = socket.handshake.address;
});

http.listen(port);