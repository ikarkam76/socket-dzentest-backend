require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { instrument } = require("@socket.io/admin-ui");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.use(express.static(path.join(__dirname, "public")));


app.post("/", (req, res) => {
    res.send('post hello')
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
