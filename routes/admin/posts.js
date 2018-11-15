const express = require("express");
const Post = require("./../../models/post");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const flash = require("connect-flash");
const moment = require("moment");

const uploadDir = path.join(__dirname, "../../public/uploads/");

var storage = multer.diskStorage({
  destination: "./public/uploads/",

  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var imageFilter = function(req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({
  // dest: "uploads/",
  storage: storage,
  fileFilter: imageFilter
});

const router = express.Router();
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

router.post("/create", upload.single("file"), (req, res, next) => {
  let error = [];

  if (!req.body.title) {
    error.push({ message: "please add title" });
  }

  if (!req.body.body) {
    error.push({ message: "please add description" });
  }

  if (error.length > 0) {
    res.render("admin/posts/create", {
      errors: error
    });
  } else {
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
    const date = moment(req.body.date).format("MMMM Do YYYY, h:mm:ss a");
    post.date = date;
    console.log(date);

    if (req.file) {
      post.file = req.file.filename;
    }
    post
      .save()
      .then(savedPost => {
        req.flash(
          "success_message",
          `post ${savedPost.title} successfully created`
        );
        console.log(savedPost);
        res.redirect("/admin/posts");
      })
      .catch(err => {
        console.log(err);
      });
  }
});

router.put("/edit/:id", upload.single("file"), (req, res) => {
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
      if (req.file) {
        post.file = req.file.filename;
      }
      post
        .save()
        .then(updatedPost => {
          req.flash(
            "success_message",
            `post ${updatedPost.title} successfully updated`
          );
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
  Post.findOne({ _id: req.params.id }).then(posts => {
    fs.unlink(uploadDir + posts.file, err => {
      posts.remove();
      res.redirect("/admin/posts");
    });
    req.flash("success_message", `post ${posts.title} successfully deleted`);
  });
});

module.exports = router;
