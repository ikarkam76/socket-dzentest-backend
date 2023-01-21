const express = require("express");
const commentsRouter = express.Router();
const {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
} = require("../../server/controllers/controllers");
const {
  createReplysTable,
  validationComment,
  validationReply,
} = require("../../server/middlewars/middlewars");

commentsRouter.get("/", getCommentsController);
commentsRouter.post("/", validationComment, addCommentController);
commentsRouter.post("/reply", createReplysTable, validationReply, addReplyController);
commentsRouter.get("/reply", getReplysController);

module.exports = commentsRouter;