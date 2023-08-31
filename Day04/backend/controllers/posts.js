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
  try {
    console.log("creating post");
    let db = connectdb();
    console.log(req.body);
    postData = JSON.parse(req.body.postData);
    console.log(postData);
    let imageUrl = "";
    console.log("getting image");
    if (req.files[0]) {
      imageUrl = `/images/${req.files[0].filename
        }`;
    }
    let sql = `INSERT INTO posts (content, imgUrl) VALUES ( '${postData.content}', '${imageUrl}')`;
    console.log("inserting");

    db.run(sql);
    console.log("Post successfully added!");
    res.status(200).json("Post successfully added!");
    //db.close();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }


};
/*
exports.modifyPost = (req, res, next) => { };
*/
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  let db = connectdb();
  let sql = `SELECT * FROM posts WHERE id = ${id};`;
  db.all(sql, function (err, resultsOnePost, fields) {
    if (err)
      res.status(400).json({
        error: err,
      });
    console.log("post found");

    try {
      const filename = resultsOnePost[0].imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sql = `DELETE FROM posts WHERE posts.id = ${id}`;
        db.run(sql);
        res.status(200).json({ message: "Post deleted!" });
      })
    } catch (err) {
      sql = `DELETE FROM posts WHERE posts.id = ${id}`;
      db.run(sql)
      res.status(200).json({ message: "Post deleted!" });
    }
  });
  //db.close();
};
