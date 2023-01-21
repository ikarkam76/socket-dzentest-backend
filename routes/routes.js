const express = require("express");
const commentsRouter = express.Router();
const {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
} = require("../controllers/controllers");
const {
  createReplysTable,
  validationComment,
  validationReply,
} = require("../middlewars/middlewars");

commentsRouter.get("/", getCommentsController);
commentsRouter.post("/", validationComment, addCommentController);
commentsRouter.post("/reply", createReplysTable, validationReply, addReplyController);
commentsRouter.get("/reply", getReplysController);

module.exports = commentsRouter;