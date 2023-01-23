const { connectionSQL } = require('../db/connect')

const getCommentsController = async (req, res, next) => {
    const getSQL = "SELECT * FROM comments"
    await connectionSQL.query(getSQL, (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            return res.status(200).json({result})
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

const getFilesController = async (req, res, next) => {
  const getSQL = "SELECT * FROM files";
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
    const { user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO comments ( user_name, email, home_page, comment, time) VALUES( "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
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
  const { file, parentId } = req.body;
  const getSQL = `INSERT INTO files (parentId, file) VALUES ("${parentId}", "${file}")`;
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};

const uploadImageController = async (req, res, next) => {
  const { image, parentId } = req.body;
  const getSQL = `INSERT INTO images (parentId, image) VALUES ("${parentId}", "${image}")`;
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};



module.exports = {
  getCommentsController,
  addCommentController,
  addReplyController,
  getReplysController,
  uploadFileController,
  uploadImageController,
  getFilesController,
  getImagesController,
};