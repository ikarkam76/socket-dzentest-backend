const Joi = require("joi");
const { bucket } = require("../services/storageService");


module.exports = {
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
      parentId: Joi.string().required(),
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
  uploadToStorage: (req, res, next) => {
    try {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();
      blobStream.on("finish", () => {
        return;
      });
      blobStream.end(req.file.buffer);
    } catch (error) {
      return res.status(500).json({message: error.message});
    };
    next();
  },
};