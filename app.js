const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

// set view engine
app.engine("handlebars", exphbs({ defaultLayout: "home" }));
app.set("view engine", "handlebars");

// importing the routes
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");

// using the routes
app.use("/admin", admin);
app.use("/", home);

app.listen(4000, () => {
  console.log(" listening  on port 4000");
});
