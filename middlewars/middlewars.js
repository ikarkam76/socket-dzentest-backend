const { connectionSQL } = require("../db/connect")
const Joi = require("joi");
const DATABASE = process.env.DATABASE;

module.exports = {
  createReplysTable: async (req, res, next) => {
    await connectionSQL.query(
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.replys(comment_id VARCHAR(100), id VARCHAR(100), user_name VARCHAR(100), email VARCHAR(100), home_page VARCHAR(100), comment TEXT, time DATETIME, CONSTRAINT replys_PK PRIMARY KEY (id))`,
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
        }
      }
    );
    next();
  },
  createFilesTable: async (req, res, next) => {
    await connectionSQL.query(
      `CREATE TABLE IF NOT EXISTS ${DATABASE}.files(comment_id VARCHAR(100), id INT UNSIGNED NOT NULL AUTO_INCREMENT NOT NULL COMMENT 'id', file BLOB, CONSTRAINT files_PK PRIMARY KEY (id))`,
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
        }
      }
    );
    next();
  },
  validationComment: (req, res, next) => {
    const validationSchema = Joi.object({
      id: Joi.string().required(),
      user_name: Joi.string().required(),
      email: Joi.string().email().required(),
      home_page: Joi.string(),
      comment: Joi.string().required(),
      time: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
  validationReply: (req, res, next) => {
    const validationSchema = Joi.object({
      comment_id: Joi.string().required(),
      id: Joi.string().required(),
      user_name: Joi.string().required(),
      email: Joi.string().email().required(),
      home_page: Joi.string(),
      comment: Joi.string().required(),
      time: Joi.string().required(),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details });
    }
    next();
  },
};