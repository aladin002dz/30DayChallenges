const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const postsCtrl = require("../controllers/posts");

router.get("/", postsCtrl.getAllPosts);
//router.get("/", auth, postsCtrl.getAllPosts);

router.post("/", multer, postsCtrl.createPost);
router.delete("/:id", postsCtrl.deletePost);
/*
router.post("/", multer, postsCtrl.createPost);
router.get("/:id", postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.modifySauce);

router.post("/:id/like", auth, postsCtrl.likeDislike);
*/
module.exports = router;
