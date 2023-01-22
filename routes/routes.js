const express = require("express");
const commentsRouter = express.Router();
const {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
  uploadFileController,
} = require("../controllers/controllers");
const {
  createReplysTable,
  validationComment,
  validationReply,
  createFilesTable,
} = require("../middlewars/middlewars");

commentsRouter.get("/", getCommentsController);
commentsRouter.post("/", validationComment, addCommentController);
commentsRouter.post("/reply", createReplysTable, validationReply, addReplyController);
commentsRouter.get("/reply", getReplysController);
commentsRouter.post('/files', createFilesTable, uploadFileController)

module.exports = commentsRouter;