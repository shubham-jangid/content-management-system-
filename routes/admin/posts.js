const express = require("express");
const Post = require("./../../models/post");

const router = express.Router();
router;
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

router.get("/", (req, res) => {
  Post.find({}).then(postsData => {
    res.render("admin/posts", {
      posts: postsData
    });
  });
});

router.get("/edit/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then(postData => {
    console.log(postData);
    res.render("admin/posts/edit", {
      post: postData
    });
  });
});

router.get("/create", (req, res) => {
  res.render("admin/posts/create");
});

router.post("/create", (req, res) => {
  console.log(req.body);

  let allowComments = true;
  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }
  console.log(allowComments);

  const post = new Post();
  post.title = req.body.title;
  post.status = req.body.status;
  post.allowComments = allowComments;
  post.body = req.body.body;
  post
    .save()
    .then(() => {
      res.redirect("/admin/posts");
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/edit/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (req.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }
      post.title = req.body.title;
      post.status = req.body.status;
      post.allowComments = allowComments;
      post.body = req.body.body;
      post
        .save()
        .then(updatedPost => {
          res.redirect("/admin/posts");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/admin/posts");
  });
});

module.exports = router;
