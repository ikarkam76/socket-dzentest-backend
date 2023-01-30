const express = require("express");
const commentsRouter = express.Router();
const {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
  addFileController,
  getImagesController,
  addImageController,
} = require("../controllers/controllers");
const {
  validationComment,
  uploadToStorage,
  validationReply,
} = require("../middlewars/middlewars");
const { upload } = require("../services/storageService");

commentsRouter.get("/", getCommentsController);
commentsRouter.get("/reply", getReplysController);
commentsRouter.get("/images", getImagesController);
commentsRouter.post("/", validationComment, addCommentController);
commentsRouter.post("/reply", validationReply, addReplyController);
commentsRouter.post(
  "/upload/image",
  upload.single("file"),
  uploadToStorage,
  addImageController
);
commentsRouter.post(
  "/upload/file",
  upload.single("file"),
  uploadToStorage,
  addFileController
);

module.exports = commentsRouter;
