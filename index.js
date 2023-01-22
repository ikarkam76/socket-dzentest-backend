require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const multer = require('multer');
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
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
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.comments(id VARCHAR(100), user_name VARCHAR(100), email VARCHAR(100), home_page VARCHAR(100), comment TEXT DEFAULT '', time DATETIME, CONSTRAINT comments_PK PRIMARY KEY (id))`,
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