const { connectionSQL } = require("../db/connect");

const getCommentsController = async (req, res, next) => {
  const getSQL = "SELECT * FROM comments";
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

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

const getImagesController = async (req, res, next) => {
  const getSQL = "SELECT * FROM images";
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

const addCommentController = async (req, res, next) => {
  const { id, user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO comments ( id, user_name, email, home_page, comment, time) VALUES("${id}", "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

const addReplyController = async (req, res, next) => {
  const { parentId, user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO replys (parentId, user_name, email, home_page, comment, time) VALUES("${parentId}", "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

const addImageController = async (req, res, next) => {
      const imgUrl = `https://storage.googleapis.com/comments-images/${req.file.originalname}`;
      const getSQL = `INSERT INTO images (parentId, image) VALUES ("${req.body.parentId}", "${imgUrl}")`;
      await connectionSQL.query(getSQL, (err, result) => {
        if (err) {
          return console.log(err.message);
        } else {
          return res.json({result});
        }
      });
}

const addFileController = async (req, res, next) => {
  const imgUrl = `https://storage.googleapis.com/comments-images/${req.file.originalname}`;
  const getSQL = `INSERT INTO files (parentId, file) VALUES ("${req.body.parentId}", "${imgUrl}")`;
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
  addFileController,
  getImagesController,
  addImageController,
};