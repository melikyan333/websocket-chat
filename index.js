const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

io.on('connection', (socket) => {
  socket.username = 'Guest'
  socket.on('message', (msg) => io.emit('message', { 'user': socket.username, 'message': msg}))
  socket.on('join', (username) => {
    if (username != null) {
      socket.username = username
    }
    socket.broadcast.emit('message', {user: 'Server', 'message' : `👋${socket.username} has joined the chat`});
  });
});

http.listen(3000, () => console.log('Listening on port 3000'))
