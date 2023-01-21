require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { connectionSQL } = require("../server/db/connect");
const commentsRouter = require('../server/routes/routes');

const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE;

app.use(express.json());
app.use(
  cors({
    origin: "*"
  }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/api', commentsRouter)


const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on('comment', (msg) => {
        io.emit('comment', msg);
    })
});

const start = async () => {
  try {
    await connectionSQL.connect((err) => {
      if (err) {
        return console.log(err.message);
      } else {
        console.log("Database connected!");
      }
    });
    await connectionSQL.query(
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.comments(id VARCHAR(100), user_name VARCHAR(100), email VARCHAR(100), home_page VARCHAR(100), comment TEXT, time VARCHAR(20))`,
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
        }
      }
    );
    await server.listen(PORT, () => {
      console.log(`Server running. Use API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
    return process.exit(1);
  }
};
start();