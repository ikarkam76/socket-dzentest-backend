const Joi = require("joi");
const Jimp = require("jimp");
const path = require("path");

const uploadDir = path.resolve("./images");

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
  updateFile: (req, res, next) => {
    const { filename } = req.file;
    return res.status(200).json({ file: filename });
    next();
  },
  updateImage: (req, res, next) => {
  const { filename } = req.file;
  Jimp.read(`${uploadDir}/${filename}`)
    .then((image) => {
      return image
        .scaleToFit(320, 240)
        .quality(60)
        .write(`${uploadDir}/${filename}`);
    })
    .catch((err) => {
      console.error(err.message);
    });
    return res.status(200).json({ image: filename });
  next();
},
};