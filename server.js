const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let currentText = ''; // Store the current state of the text

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('text update', currentText);

  socket.on('text change', (data) => {
    currentText = data.text;
    socket.broadcast.emit('text update', { text: currentText, userId: data.userId });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
