const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// importing helper function
const { select } = require("./helpers/handlebars-helper");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/cms",
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(" cannot connect to database " + err);
    } else {
      console.log("connected to database");
    }
  }
);

//using static
app.use(express.static(path.join(__dirname, "./public")));

// set view engine
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "home", helpers: { select: select } })
);
app.set("view engine", "handlebars");

//body-parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//method override
app.use(methodOverride("_method"));

// importing the routes
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");

// app.use("/admin/posts/", express.static("uploads"));

// using the routes
app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);

app.listen(4000, () => {
  console.log(" listening  on port 4000");
});
