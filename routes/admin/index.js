const express = require("express");
const Post = require("./../../models/post");
const faker = require("faker");

const admin = express.Router();

admin.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

admin.get("/", (req, res) => {
  res.render("admin/index");
});

admin.get("/generate-fake-posts", (req, res) => {
  console.log("hlskd");
  res.send("hello");
  // for (let i = 0; i < req.body.amount; i++) {
  //   const newPost = new Post();
  //   newPost.title = faker.name.firstName();
  //   newPost.body = faker.lorem.sentences();

  //   newPost
  //     .save()
  //     .then()
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   res.redirect("/admin");
  // }
});

module.exports = admin;
