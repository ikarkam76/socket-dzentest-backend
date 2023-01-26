const multer = require("multer");
const path = require("path");

const uploadDir = path.resolve("images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadImage = multer({ storage });

module.exports = { uploadImage };