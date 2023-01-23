const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");

const uploadDir = path.resolve("./upload");

const updateImage = async (req, res, next) => {
  const { filename } = req.file;
  const [name, ext] = filename.split(".");
  await Jimp.read(`${uploadDir}/${filename}`)
    .then((image) => {
      return image
        .scaleToFit(320, 240)
        .quality(60)
        .write(`${uploadDir}/${name}.${ext}`);
    })
    .catch((err) => {
      console.error(err.message);
    });
  const image = await fs.readFile(`${uploadDir}/${filename}`, (err, data) => {
    if (err) {
      throw err
    } 
    console.log(data);
  })
  return res.status(200).json({ image: image });
  next();
};

module.exports = {updateImage}