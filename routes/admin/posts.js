const express = require("express");
const Post = require("./../../models/post");

const router = express.Router();
router;
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  res.send("all posts here");
});

router.get("/create", (req, res) => {
  res.render("admin/posts/create");
});

router.post("/create", (req, res) => {
  console.log(req.body);

  const post = new Post();
  let allowComment = true;

  if (req.body.allowComment) {
    allowComment = true;
  } else allowComment = false;

  post.title = req.body.title;
  post.status = req.body.status;
  post.allowComment = allowComment;
  post.body = req.body.body;
  post
    .save()
    .then()
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
