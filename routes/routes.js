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
  getImagesController,
} = require("../controllers/controllers");
const {
  validationComment,
  validationReply,
} = require("../middlewars/middlewars");

commentsRouter.get("/", getCommentsController);
commentsRouter.get("/reply", getReplysController);
commentsRouter.get("/files", getFilesController);
commentsRouter.get("/images", getImagesController);
commentsRouter.post("/", validationComment, addCommentController);
commentsRouter.post("/reply", validationReply, addReplyController);
commentsRouter.post('/files', uploadFileController);
commentsRouter.post("/images", uploadImageController);

module.exports = commentsRouter;