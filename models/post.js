const mongoose = require("mongoose");
const moment = require("moment");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "public"
  },
  allowComments: {
    type: Boolean,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  file: {
    type: String
  },

  date: {
    type: Date
    // default: Date.now()
  }
});

module.exports = mongoose.model("posts", postSchema);
