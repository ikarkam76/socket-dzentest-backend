const express = require("express");
const commentsRouter = express.Router();
const {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
  uploadFileController,
  uploadImageController,
  getFilesController,
  getFilesListController,
} = require("../controllers/controllers");
const {
  validationComment,
  validationReply,
  updateImage,
} = require("../middlewars/middlewars");
const {uploadImage} = require('../services/imageUpload');
const { uploadTxtFile } = require("../services/fileUpload");

commentsRouter.get("/", getCommentsController);
commentsRouter.get("/reply", getReplysController);
commentsRouter.post("/get/files", getFilesController);
commentsRouter.get('/list', getFilesListController)
commentsRouter.post("/", validationComment, addCommentController);
commentsRouter.post("/reply", validationReply, addReplyController);
commentsRouter.post("/upload/image", uploadImage.single("file"), updateImage, uploadImageController);
commentsRouter.post("/upload/file", uploadTxtFile.single("file"), uploadFileController);

module.exports = commentsRouter;