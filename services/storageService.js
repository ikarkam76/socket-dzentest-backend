const { Storage } = require("@google-cloud/storage");
const multer = require("multer");

const multerStorage = multer.memoryStorage();
const upload = multer({storage: multerStorage})

const projectId = "comments-app-376014";
const keyFilename = "comments-app-376014-5a5dbfe490c8.json";

const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("comments-images");

module.exports = { upload, bucket };
