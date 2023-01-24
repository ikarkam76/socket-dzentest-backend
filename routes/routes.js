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
} = require("../controllers/controllers");
const {
  validationComment,
  validationReply,
  updateImage,
  updateFile,
} = require("../middlewars/middlewars");
const {uploadImage} = require('../services/imageUpload');
const { uploadTxtFile } = require("../services/fileUpload");

commentsRouter.get("/", getCommentsController);//
commentsRouter.get("/reply", getReplysController);//
commentsRouter.get("/files", getFilesController);
commentsRouter.post("/", validationComment, addCommentController);//
commentsRouter.post("/reply", validationReply, addReplyController);//
commentsRouter.post('/files', uploadFileController);//
commentsRouter.post("/images", uploadImageController);//
commentsRouter.post("/upload/image", uploadImage.single("file"), updateImage);//
commentsRouter.post("/upload/file", uploadTxtFile.single("file"), updateFile);//

module.exports = commentsRouter;