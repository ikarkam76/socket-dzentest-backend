const multer = require("multer");
const path = require("path");

const uploadDir = path.resolve("./files");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
  limits: {
    fileSize: 100,
  },
});

const uploadTxtFile = multer({ storage });

module.exports = { uploadTxtFile };
