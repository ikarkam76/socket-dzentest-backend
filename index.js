require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { connectionSQL } = require("./db/connect");
const commentsRouter = require('./routes/routes');

const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE;

app.use(express.json());
app.use(
  cors({
    origin: "*"
  }));
app.use(express.static(path.join(__dirname, "public")));

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
  });
  socket.on('replys', (msg) => {
    io.emit('replys', msg);
  });
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
       `CREATE TABLE IF NOT EXISTS ${DATABASE}.comments(id VARCHAR(100) NOT NULL, user_name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, home_page VARCHAR(100), comment TEXT NOT NULL, time DATETIME NOT NULL, CONSTRAINT comments_id_pk PRIMARY KEY (id))`,
       (err, result) => {
         if (err) {
           console.log(err.message);
         } else {
           console.log(result);
         }
       }
     );
    await connectionSQL.query(
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.replys(id INT UNSIGNED NOT NULL AUTO_INCREMENT, parentId VARCHAR(100) NOT NULL, user_name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, home_page VARCHAR(100) DEFAULT '', comment TEXT NOT NULL, time DATETIME NOT NULL, CONSTRAINT replys_id_pk PRIMARY KEY (id), CONSTRAINT replys_parentId_fk FOREIGN KEY (parentId) REFERENCES comments(id))`,
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
        }
      }
    );
    await connectionSQL.query(
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.images(id INT UNSIGNED NOT NULL AUTO_INCREMENT, parentId VARCHAR(100) NOT NULL, image TEXT NOT NULL, CONSTRAINT images_id_pk PRIMARY KEY (id), CONSTRAINT images_parentId_fk FOREIGN KEY (parentId) REFERENCES comments(id))`,
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
        }
      }
    );
    await connectionSQL.query(
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.files(id INT UNSIGNED NOT NULL AUTO_INCREMENT, parentId VARCHAR(100) NOT NULL, file TEXT NOT NULL, CONSTRAINT files_id_pk PRIMARY KEY (id), CONSTRAINT files_parentId_fk FOREIGN KEY (parentId) REFERENCES comments(id))`,
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
