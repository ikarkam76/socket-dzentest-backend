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

const addCommentController = async (req, res, next) => {
    const { id, user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO comments (id, user_name, email, home_page, comment, time) VALUES("${id}", "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
  console.log(time, 'back');
    await connectionSQL.query(getSQL, (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        return res.status(200).json({ result });
      }
    });
}

const addReplyController = async (req, res, next) => {
  const {comment_id, id, user_name, email, home_page, comment, time } = req.body;
  const getSQL = `INSERT INTO replys (comment_id, id, user_name, email, home_page, comment, time) VALUES("${comment_id}", "${id}", "${user_name}", "${email}", "${home_page}", "${comment}", "${time}")`;
  await connectionSQL.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      return res.status(200).json({ result });
    }
  });
};



module.exports = {getCommentsController, addCommentController, addReplyController, getReplysController}