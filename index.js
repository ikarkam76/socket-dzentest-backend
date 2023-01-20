require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*"
  }));
  
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(__dirname, "public")));


app.post("/", (req, res) => {
    res.send('post hello')
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on('comment', (msg) => {
        io.emit('comment', msg);
    })
});

instrument(io, {
  auth: false,
});

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`App listening on port ${PORT}`);
});
