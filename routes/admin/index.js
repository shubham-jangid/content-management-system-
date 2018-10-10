const express = require("express");

const admin = express.Router();

admin.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";
  next();
});

admin.get("/", (req, res) => {
  res.render("admin/index");
});

module.exports = admin;
