const { connectionSQL } = require('../db/connect');
const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve("public/images");

const getCommentsController = async (req, res, next) => {
    const getSQL = "SELECT * FROM comments"
    await connectionSQL.query(getSQL, (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
          return res.status(200).json({ result });
        }
    })
}

const getReplysController = async (req, res, next) => {
  const getSQL = "SELECT * FROM replys";
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

const getFilesListController = async (req, res, next) => {
  try {
    const files = await fs.readdirSync(uploadDir);
    return res.status(200).json({files, uploadDir});
  } catch (error) {
    console.log(error);
  }
}

const getFilesController = async (req, res, next) => {
  const {name} = req.body
  return res.status(200).sendFile(`${uploadDir}/${name}`);
};

const addCommentController = async (req, res, next) => {
    const {id, user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO comments ( id, user_name, email, home_page, comment, time) VALUES("${id}", "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
    await connectionSQL.query(getSQL, (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        return res.status(200).json({ result });
      }
    });
}

const addReplyController = async (req, res, next) => {
  const {parentId, user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO replys (parentId, user_name, email, home_page, comment, time) VALUES("${parentId}", "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

const uploadFileController = async (req, res, next) => {
  const { parentId } = req.body;
  const { filename } = req.file;
  const getSQL = `INSERT INTO files (parentId, file) VALUES ("${parentId}", "${filename}")`;
  try {
        await connectionSQL.query(getSQL, (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            return res.status(200).json({ result });
          }
        });
  } catch (error) {
    console.log(error);
  }
};

const uploadImageController = async (req, res, next) => {
  const { parentId } = req.body;
  const { filename } = req.file;
  const getSQL = `INSERT INTO images (parentId, image) VALUES ("${parentId}", "${filename}")`;
    try {
      await connectionSQL.query(getSQL, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          return res.status(200).json({ result });
        }
      });
    } catch (error) {
      console.log(error);
    }

};



module.exports = {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
  uploadFileController,
  uploadImageController,
  getFilesController,
  getFilesListController,
 };