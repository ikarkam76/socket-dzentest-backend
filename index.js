require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


app.post("/", (req, res) => {
    res.send('post hello')
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  socket.on('comment', (msg) => {
    console.log(msg);
        io.emit('comment', msg);
    })
});

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`App listening on port ${PORT}`);
});
