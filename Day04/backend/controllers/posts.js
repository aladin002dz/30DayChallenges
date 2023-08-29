const connectdb = require("../db_connection");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
  let db = connectdb();
  console.log("getting all posts!");

  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    }
    res.status(200).json(rows);
  });
  db.close();
};

exports.createPost = (req, res, next) => {
  let db = connectdb();
  console.log(req.body);
  postData = JSON.parse(req.body.postData);
  let imageUrl = "";
  if (req.files[0]) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${req.files[0].filename
      }`;
  }

  let sql = `INSERT INTO posts (content, imgUrl) VALUES ( '${postData.content}', '${imageUrl}')`;

  try {
    db.run(sql);
    console.log("Post successfully added!");
    res.status(200).json("Post successfully added!");
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }

  db.close();
};

exports.modifyPost = (req, res, next) => { };

exports.deletePost = (req, res, next) => {
  const _id = req.params.id;
  let sql = `SELECT * FROM posts WHERE id = ${_id};`;
  connectdb.query(sql, function (err, resultsOnePost, fields) {
    if (err)
      res.status(400).json({
        error: err,
      });
    console.log("post found");

    try {
      const filename = resultsOnePost[0].imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sql = `DELETE FROM posts WHERE posts.id = ${_id}`;
        connectdb.query(sql, function (err, result, fields) {
          if (err) res.status(400).json({ message: err });
          console.log("post deleted");
          let sql = "SELECT * FROM posts";
          connectdb.query(sql, function (errGetAll, resultGetAll, fields) {
            if (errGetAll)
              res.status(400).json({
                error: errGetAll,
              });
            res.status(200).json(resultGetAll);
          });
        });
      });
    } catch (err) {
      sql = `DELETE FROM posts WHERE posts.id = ${_id}`;
      connectdb.query(sql, function (err, result, fields) {
        if (err) res.status(400).json({ message: err });
        console.log("post deleted");
        let sql = "SELECT * FROM posts";
        connectdb.query(sql, function (errGetAll, resultGetAll, fields) {
          if (errGetAll)
            res.status(400).json({
              error: errGetAll,
            });
          res.status(201).json(resultGetAll);
        });
      });
    }
  });
};
